"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

/**
 * Peak alpha of the brightest band.
 *
 * This is a contrast budget, not a taste knob. The hero sets light text on
 * #04060A; anything painted behind it *raises* the background luminance and
 * *lowers* the contrast ratio. At this value the hero paragraph (text-ink-muted)
 * and the mono location label both still clear 4.5:1 at the brightest point of
 * the animation. Raising it starts failing WCAG AA — measure before you do.
 */
const INTENSITY = 0.13;

const VERTEX = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;

  uniform float uTime;
  uniform float uAspect;
  uniform float uIntensity;
  varying vec2 vUv;

  // Ashima simplex noise — the standard compact 2D implementation.
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                            dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Four octaves is enough for soft ribbons; more just costs fragments.
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * snoise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    // Aspect-correct so the bands don't smear on ultra-wide displays.
    vec2 p = vec2(vUv.x * uAspect, vUv.y);
    float t = uTime * 0.05;

    float n1 = fbm(vec2(p.x * 1.5 + t, p.y * 2.2 - t * 0.55));
    float n2 = fbm(vec2(p.x * 2.4 - t * 0.65, p.y * 3.0 + t * 0.35));
    float band = smoothstep(0.2, 0.95, 0.5 + 0.5 * (n1 * 0.7 + n2 * 0.3));

    /*
     * Confined to the lower-right, measured against the real layout: the badge
     * starts at uv.y 0.72, the headline spans 0.67–0.48 and the ledger's last
     * label bottoms out at 0.29, so everything below 0.29 is clear. The scroll
     * cue is the one exception — it sits at uv.y 0.05, x 0.32 — which is why
     * the left side is floored near zero rather than merely dimmed.
     *
     * Placing the light where no text sits is what makes this safe. Tinting the
     * whole hero would have forced the alpha so low it was invisible anyway.
     */
    float vertical = smoothstep(0.42, 0.06, vUv.y);
    float right = smoothstep(0.30, 0.80, vUv.x);
    float envelope = vertical * mix(0.06, 1.0, right);

    vec3 deep = vec3(0.13, 0.38, 0.72);
    vec3 cyan = vec3(0.0, 0.94, 1.0);

    gl_FragColor = vec4(mix(deep, cyan, band), band * envelope * uIntensity);
  }
`;

/**
 * Ambient aurora behind the hero.
 *
 * One full-screen triangle, one draw call, on the GPU — deliberately not the
 * 700-particle 2D-canvas flow field the pre-rewrite build ran, which held a rAF
 * loop and a per-frame blur filter for the entire visit.
 *
 * It stops completely whenever it isn't being looked at: off-screen, hidden tab,
 * or reduced motion (which renders a single still frame rather than nothing —
 * content is never left blank on this site).
 */
export function Aurora({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
        // A 3x phone would otherwise shade 9x the fragments for no visible gain.
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      });
    } catch {
      // No WebGL. The CSS washes in Backdrop stay as the fallback.
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    host.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      uniforms: {
        uTime: { value: 0 },
        uAspect: { value: 1 },
        uIntensity: { value: INTENSITY },
      },
      transparent: true,
      depthTest: false,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const { clientWidth, clientHeight } = host;
      if (clientWidth === 0 || clientHeight === 0) return;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.uAspect.value = clientWidth / clientHeight;
    };
    resize();

    const draw = (time: number) => {
      program.uniforms.uTime.value = time * 0.001;
      renderer.render({ scene: mesh });
    };

    let frame = 0;
    let onScreen = true;

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      draw(time);
    };

    const start = () => {
      if (frame || reduceMotion || !onScreen || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // A single still frame, so reduced-motion users see the same composition.
    draw(0);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!frame) draw(performance.now());
    });
    resizeObserver.observe(host);

    // The hero is one viewport of a seven-section page — past it, this costs 0.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(host);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      // Fast refresh would otherwise leak contexts until the browser evicts one.
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, [reduceMotion]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      // Blends into the canvas before the About section rather than ending on a
      // hard edge. Spatial, so no scroll listener is needed for the same result.
      style={{
        maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 55%, transparent 100%)",
      }}
    />
  );
}
