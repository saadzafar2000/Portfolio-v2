"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/use-media-query";

/**
 * Particle count. Enough to feel alive without melting a phone GPU.
 * Scales down on narrow viewports where fewer particles are visible anyway.
 */
const BASE_COUNT = 60;
const MOBILE_COUNT = 30;
const BREAKPOINT = 768;

/** Maximum distance (px) between two particles before a connecting line is drawn. */
const LINK_DISTANCE = 140;

/** Base particle speed — kept slow for an ambient, non-distracting feel. */
const SPEED = 0.25;

/** Accent colour channels — matches --accent (0 240 255). */
const ACCENT_R = 0;
const ACCENT_G = 240;
const ACCENT_B = 255;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  /** Individual opacity for size variation. */
  alpha: number;
}

function createParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * SPEED * 2,
    vy: (Math.random() - 0.5) * SPEED * 2,
    radius: Math.random() * 1.6 + 0.6,
    alpha: Math.random() * 0.5 + 0.15,
  }));
}

/**
 * Ambient constellation particles behind all content.
 *
 * Renders on a fixed `<canvas>` at z-0 alongside the Backdrop. Each particle
 * drifts slowly and connects to neighbours within `LINK_DISTANCE` px with a
 * faint line, producing the classic "constellation" effect.
 *
 * Performance budget:
 * - Canvas2D, no WebGL context (leaves the one WebGL context for Aurora)
 * - DPR capped at 1.5
 * - Stops completely when the tab is hidden
 * - Reduced-motion renders a single still frame
 */
export function Particles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const prevW = w;
      const prevH = h;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = w < BREAKPOINT ? MOBILE_COUNT : BASE_COUNT;
      if (particles.length === 0) {
        particles = createParticles(targetCount, w, h);
      } else {
        if (prevW > 0 && prevH > 0) {
          const scaleX = w / prevW;
          const scaleY = h / prevH;
          for (const p of particles) {
            p.x *= scaleX;
            p.y *= scaleY;
          }
        }
        if (particles.length < targetCount) {
          particles.push(...createParticles(targetCount - particles.length, w, h));
        } else if (particles.length > targetCount) {
          particles = particles.slice(0, targetCount);
        }
      }
    };

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Update positions — wrap at edges so particles never vanish.
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }

      // Draw connecting lines.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DISTANCE) {
            const opacity = (1 - dist / LINK_DISTANCE) * 0.12;
            ctx.strokeStyle = `rgba(${ACCENT_R}, ${ACCENT_G}, ${ACCENT_B}, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles.
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT_R}, ${ACCENT_G}, ${ACCENT_B}, ${p.alpha})`;
        ctx.fill();
      }
    };

    // Reduced-motion: one static frame.
    draw();

    let frame = 0;

    const loop = () => {
      frame = requestAnimationFrame(loop);
      draw();
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

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
