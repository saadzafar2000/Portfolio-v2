"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Minimal Glass Monogram with Name Slide-Reveal.
 *
 * Displays the clean brand mark inside an ultra-sleek glass capsule. On hover,
 * the container smoothly expands to reveal "Saad Zafar" with an electric cyan
 * glow accent.
 */
export function Logo({
  name,
  className,
  onClick,
}: {
  name: string;
  className?: string;
  /** Dismisses mobile navigation when tapped. */
  onClick?: () => void;
}) {
  const reduceMotion = useReducedMotion();

  const spring = { type: "spring" as const, stiffness: 320, damping: 26 };

  return (
    <Link
      href="/"
      aria-label={`${name} — home`}
      onClick={onClick}
      className={cn(
        "group relative inline-flex shrink-0 items-center focus-visible:outline-none",
        className,
      )}
    >
      <motion.span
        className={cn(
          "relative inline-flex h-10 items-center gap-2.5 rounded-full px-2 py-1",
          "border border-white/10 bg-canvas-raised/80 backdrop-blur-xl",
          "transition-all duration-500 ease-editorial",
          "hover:border-cyan-500/40 hover:bg-canvas-raised/95 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]",
        )}
        whileHover={reduceMotion ? undefined : { scale: 1.03 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        transition={spring}
      >
        {/* Monogram Icon Container */}
        <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.04]">
          <Image
            src="/brand/sz-logo.png"
            alt=""
            width={32}
            height={32}
            priority
            className="h-5 w-5 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_8px_rgba(0,240,255,0.7))]"
          />
        </div>

        {/* Sliding Name Label */}
        <span className="pr-2.5 font-display text-sm font-bold tracking-tight text-ink transition-colors duration-500 group-hover:text-accent">
          {name}
        </span>

        {/* Subtle Status Accent Dot */}
        <span className="relative flex h-1.5 w-1.5 shrink-0 pr-1">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </span>
      </motion.span>
    </Link>
  );
}
