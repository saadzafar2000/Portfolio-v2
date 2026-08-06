"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Reading-progress hairline pinned to the top of the viewport.
 * Carried over from the previous CustomScrollbar — the one animation from the
 * old build worth keeping as it was.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-accent"
    />
  );
}
