"use client";

import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import type { GalleryImage } from "@/lib/types";
import { cn } from "@/lib/utils";

const MODES = [
  { key: "dark", Icon: Moon, label: "Dark mode preview" },
  { key: "light", Icon: Sun, label: "Light mode preview" },
] as const;

type Mode = (typeof MODES)[number]["key"];

interface ThemePreviewProps {
  dark: GalleryImage;
  light: GalleryImage;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  /** Aspect ratio and object-fit, supplied per surface. */
  imageClassName?: string;
  className?: string;
}

/**
 * Two screenshots of the same product in dark and light theme, cross-faded by a
 * segmented switch.
 *
 * For projects that actually shipped a dual-theme UI, this demonstrates the
 * claim rather than asserting it in prose — which is the whole reason it exists
 * instead of a second gallery thumbnail.
 *
 * Layout note: both layers occupy the same CSS grid cell via `[grid-area:1/1]`,
 * so the container is sized by the images themselves. Absolutely positioning the
 * second layer would collapse the height and break the responsive aspect ratio.
 */
export function ThemePreview({
  dark,
  light,
  width,
  height,
  sizes,
  priority = false,
  imageClassName,
  className,
}: ThemePreviewProps) {
  const [mode, setMode] = useState<Mode>("dark");
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      {/* The hover scale lives here, not on the root: the switch is a sibling of
          this element, so the transform's stacking context can never trap it. */}
      <div className="grid overflow-hidden transition-transform duration-500 ease-editorial group-hover:scale-105">
        <Image
          src={dark.src}
          alt={dark.alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={cn("[grid-area:1/1]", imageClassName)}
        />
        <motion.div
          className="[grid-area:1/1]"
          // `initial={false}` so the light layer starts hidden without a fade
          // playing on mount.
          initial={false}
          animate={{ opacity: mode === "light" ? 1 : 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <Image
            src={light.src}
            alt={light.alt}
            width={width}
            height={height}
            sizes={sizes}
            className={imageClassName}
          />
        </motion.div>
      </div>

      {/* z-30 clears the stretched card link at z-20 (project-card.tsx), so the
          switch takes its own clicks instead of navigating to the case study. */}
      {/* Opaque ground: this control sits over the light-mode screenshot half
          the time, where a 60% black wash left the inactive icon at ~1.9:1. */}
      <div
        role="group"
        aria-label="Theme preview"
        className="absolute right-4 top-4 z-30 flex gap-1 rounded-full border border-white/20 bg-canvas/85 p-1 backdrop-blur-md"
      >
        {MODES.map(({ key, Icon, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            aria-pressed={mode === key}
            aria-label={label}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-500 ease-editorial",
              "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent",
              mode === key
                ? "bg-accent text-accent-ink"
                : "text-ink-muted hover:text-ink",
            )}
          >
            <Icon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        ))}
      </div>
    </div>
  );
}
