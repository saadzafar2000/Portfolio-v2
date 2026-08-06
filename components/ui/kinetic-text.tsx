"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface KineticTextProps {
  /** Each string is a visual line; words inside are staggered individually. */
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Animate on mount (hero) rather than on scroll into view. */
  immediate?: boolean;
}

const SPRING = {
  type: "spring" as const,
  stiffness: 220,
  damping: 26,
  mass: 0.9,
};

/**
 * Kinetic headline: every word rises out of its own clipping mask on a spring,
 * staggered across the line.
 *
 * Words rather than characters — a character stagger on a 3-line headline is
 * ~50 animated nodes, and word-level splitting keeps the text selectable and
 * readable to screen readers line by line.
 */
export function KineticText({
  lines,
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: KineticTextProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <span className={cn("block", className)}>
        {lines.map((line) => (
          <span key={line} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  let wordIndex = 0;

  return (
    <span className={cn("block", className)}>
      {lines.map((line) => (
        <span key={line} className={cn("block", lineClassName)}>
          {line.split(" ").map((word) => {
            const index = wordIndex++;
            return (
              // Padding keeps descenders from being clipped by the mask.
              <span
                key={`${word}-${index}`}
                className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
              >
                <motion.span
                  data-reveal=""
                  className="inline-block"
                  initial={{ y: "115%" }}
                  {...(immediate
                    ? { animate: { y: "0%" } }
                    : {
                        whileInView: { y: "0%" },
                        viewport: { once: true, amount: 0.4 },
                      })}
                  transition={{ ...SPRING, delay: delay + index * 0.055 }}
                >
                  {word}
                </motion.span>
                {/* Real space so words don't run together when wrapped. */}
                <span className="inline-block">&nbsp;</span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
