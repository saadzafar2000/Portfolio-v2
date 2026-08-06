"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * The SZ monogram — the original brand asset, unaltered. Only the container
 * animates: an ambient cyan glow, a slight scale, and a gentle rotation pulse
 * on hover, all on spring physics.
 */
export function Logo({
  name,
  className,
  onClick,
}: {
  name: string;
  className?: string;
  /** Lets the nav dismiss its mobile menu when the mark is tapped. */
  onClick?: () => void;
}) {
  const reduceMotion = useReducedMotion();

  const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

  /**
   * Springs solve between exactly two values, so the four-keyframe rotation
   * pulse cannot ride the spring — it gets its own tween. Scale keeps the
   * spring; the two run together on hover.
   */
  const hover = {
    scale: 1.05,
    rotate: [0, -3, 3, 0],
    transition: {
      scale: spring,
      rotate: {
        duration: 0.6,
        ease: "easeInOut" as const,
        times: [0, 0.33, 0.66, 1],
      },
    },
  };

  return (
    <Link
      href="/"
      aria-label={`${name} — home`}
      onClick={onClick}
      className={cn("group relative inline-flex shrink-0", className)}
    >
      {/*
        No border, no plate — the mark stands on its own. The 44×44 box stays
        because it is the touch target and it sets the nav bar height that
        --nav-height is tuned to; it is simply invisible now.
      */}
      <motion.span
        className="relative inline-flex h-11 w-11 items-center justify-center"
        whileHover={reduceMotion ? undefined : hover}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        // Governs the return to rest, where every property is a simple pair.
        transition={spring}
      >
        <Image
          src="/brand/sz-logo.png"
          alt=""
          width={44}
          height={44}
          priority
          // The glow lands on the glyph itself. A box-shadow here would light a
          // rectangle that no longer has anything drawn in it.
          className="h-9 w-9 object-contain transition-[filter] duration-500 ease-editorial group-hover:[filter:drop-shadow(0_0_10px_rgba(0,240,255,0.6))]"
        />
      </motion.span>
    </Link>
  );
}
