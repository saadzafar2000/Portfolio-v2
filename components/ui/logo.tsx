"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Animated Brand Logo & Monogram.
 *
 * Features:
 * 1. Continuous rotating SVG tech orbit ring with dashed accent marks.
 * 2. Ambient breathing cyan glow aura pulse behind the mark.
 * 3. Gradient shimmer sweep across the mark.
 * 4. Spring-physic scale and drop-shadow glow boost on hover/tap.
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

  const spring = { type: "spring" as const, stiffness: 350, damping: 22 };

  return (
    <Link
      href="/"
      aria-label={`${name} — home`}
      onClick={onClick}
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-center focus-visible:outline-none",
        className,
      )}
    >
      <motion.span
        className="relative inline-flex h-11 w-11 items-center justify-center overflow-visible rounded-full"
        whileHover={reduceMotion ? undefined : { scale: 1.08 }}
        whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        transition={spring}
      >
        {/* Ambient Cyan Aura Pulse */}
        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-[-4px] rounded-full bg-accent/20 blur-md"
            animate={{
              scale: [0.9, 1.15, 0.9],
              opacity: [0.3, 0.65, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Rotating SVG Tech Orbit Ring */}
        <motion.svg
          viewBox="0 0 52 52"
          className="pointer-events-none absolute inset-[-4px] h-[52px] w-[52px] text-accent/40 transition-colors duration-500 group-hover:text-accent"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 14,
                  repeat: Infinity,
                  ease: "linear",
                }
          }
        >
          <defs>
            <linearGradient
              id="logo-ring-grad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(0, 240, 255, 0.85)" />
              <stop offset="50%" stopColor="rgba(0, 240, 255, 0.15)" />
              <stop offset="100%" stopColor="rgba(0, 240, 255, 0.75)" />
            </linearGradient>
          </defs>
          {/* Outer dashed tech orbit */}
          <circle
            cx="26"
            cy="26"
            r="24"
            fill="none"
            stroke="url(#logo-ring-grad)"
            strokeWidth="1.25"
            strokeDasharray="5 7 14 5"
            className="opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          />
          {/* Inner hairline orbit */}
          <circle
            cx="26"
            cy="26"
            r="20"
            fill="none"
            stroke="rgba(0, 240, 255, 0.25)"
            strokeWidth="0.75"
            strokeDasharray="2 4"
          />
        </motion.svg>

        {/* Counter-rotating inner orbital nodes */}
        {!reduceMotion && (
          <motion.svg
            viewBox="0 0 52 52"
            className="pointer-events-none absolute inset-[-4px] h-[52px] w-[52px] text-accent/70"
            animate={{ rotate: -360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <circle
              cx="26"
              cy="2"
              r="1.5"
              fill="currentColor"
              className="drop-shadow-[0_0_4px_#00F0FF]"
            />
            <circle
              cx="26"
              cy="50"
              r="1.5"
              fill="currentColor"
              className="drop-shadow-[0_0_4px_#00F0FF]"
            />
          </motion.svg>
        )}

        {/* Logo Mark Image with drop-shadow & shimmer */}
        <div className="relative overflow-hidden rounded-full p-1">
          <Image
            src="/brand/sz-logo.png"
            alt=""
            width={44}
            height={44}
            priority
            className="h-8 w-8 object-contain transition-all duration-500 group-hover:scale-105 group-hover:[filter:drop-shadow(0_0_12px_rgba(0,240,255,0.85))]"
          />

          {/* Shimmer Sweep Overlay */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
        </div>
      </motion.span>
    </Link>
  );
}
