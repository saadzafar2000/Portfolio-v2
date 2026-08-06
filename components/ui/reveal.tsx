"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Every viewport entry animation on the site runs on this spring. */
const SPRING = {
  type: "spring" as const,
  stiffness: 190,
  damping: 24,
  mass: 0.85,
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Travel distance in px. */
  y?: number;
  as?: "div" | "li" | "section";
}

/**
 * Scroll-triggered reveal on spring physics, `once: true` so nothing
 * re-animates on scroll-back.
 *
 * Under prefers-reduced-motion this renders the final state directly rather
 * than animating to it — the content must never be left invisible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      // Marks the element for the <noscript> fallback in app/layout.tsx: the
      // hidden initial state is server-rendered, so without JS it would never
      // animate away and the content would stay invisible.
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </Component>
  );
}

export { SPRING as revealSpring };
