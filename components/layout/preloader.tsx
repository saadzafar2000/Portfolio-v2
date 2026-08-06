"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/use-media-query";

const LOADING_STEPS = [
  { threshold: 0, label: "INITIALIZING ENVIRONMENT" },
  { threshold: 35, label: "LOADING SHADERS & ASSETS" },
  { threshold: 75, label: "COMPOSING PORTFOLIO WORKSPACE" },
  { threshold: 98, label: "SYSTEM READY" },
];

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 450);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 16) + 10;
        return next > 100 ? 100 : next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const currentStep =
    [...LOADING_STEPS].reverse().find((step) => progress >= step.threshold)
      ?.label || "INITIALIZING";

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 1.04,
                  filter: "blur(12px)",
                  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
                }
          }
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#04060A]/70 backdrop-blur-2xl text-ink select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none animate-pulse" />

          <div className="relative z-10 flex flex-col items-center gap-8 max-w-xs w-full px-6">
            {/* Breathing Monogram Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: 1,
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute h-20 w-20 rounded-full bg-cyan-400/25 blur-xl" />
              <Image
                src="/brand/sz-logo.png"
                alt="Muhammad Saad Zafar"
                width={72}
                height={72}
                priority
                className="h-16 w-16 object-contain relative z-10 filter drop-shadow-[0_0_22px_rgba(0,240,255,0.85)]"
              />
            </motion.div>

            {/* Editorial Counter & Progress Bar */}
            <div className="w-full flex flex-col items-center gap-3">
              {/* Large Monospace Percentage Counter */}
              <div className="flex items-baseline gap-1 font-mono">
                <span className="font-display text-4xl font-bold tracking-tight text-white tabular-nums">
                  {String(progress).padStart(3, "0")}
                </span>
                <span className="text-xs text-cyan-400 font-semibold">%</span>
              </div>

              {/* Glowing Hairline Progress Bar */}
              <div className="relative h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-300 rounded-full shadow-[0_0_12px_#00F0FF]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Dynamic Status Ticker */}
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                <motion.span
                  key={currentStep}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentStep}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
