"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

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
  varying vec2 vUv;

  // Ashima 2D Simplex Noise
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

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amp * snoise(p);
      p *= 2.1;
      amp *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 p = vec2(vUv.x * uAspect, vUv.y);
    float t = uTime * 0.08;

    // Organic Domain-Warped Liquid Water Depth Displacement
    vec2 q = vec2(fbm(p + vec2(t * 0.2, t * 0.1)), fbm(p + vec2(t * 0.15, -t * 0.2)));
    vec2 r = vec2(fbm(p + q * 1.5 + vec2(t * 0.3, t * 0.2)), fbm(p + q * 1.5 + vec2(-t * 0.25, t * 0.1)));

    float f = fbm(p + r * 2.0);

    // Deep Fluid Palette: Electric Cyan (#00F0FF), Royal Blue (#3B82F6), Deep Purple (#8B5CF6)
    vec3 c1 = vec3(0.0, 1.0, 0.92);   // Electric Cyan
    vec3 c2 = vec3(0.12, 0.45, 1.0);  // Vivid Blue
    vec3 c3 = vec3(0.65, 0.25, 0.95); // Deep Purple

    vec3 color = mix(c2, c1, clamp(f * f * 3.0, 0.0, 1.0));
    color = mix(color, c3, clamp(length(q) * 1.5, 0.0, 1.0));

    // Deep Liquid Wave Mask
    float alpha = smoothstep(0.05, 0.75, f) * 0.65;

    gl_FragColor = vec4(color, alpha);
  }
`;

export function AuroraWaves({ className }: { className?: string }) {
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
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      });
    } catch {
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

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      draw(time);
    };

    const start = () => {
      if (frame || reduceMotion || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };

    draw(0);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!frame) draw(performance.now());
    });
    resizeObserver.observe(host);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, [reduceMotion]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-[1] mix-blend-screen opacity-70", className)}
    />
  );
}
