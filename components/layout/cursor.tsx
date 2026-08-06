"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { usePointerFine, usePrefersReducedMotion } from "@/lib/use-media-query";

export function Cursor() {
  const canHover = usePointerFine();
  const prefersReducedMotion = usePrefersReducedMotion();
  const enabled = canHover && !prefersReducedMotion;

  const [cursorState, setCursorState] = useState<{
    isActive: boolean;
    label: string | null;
  }>({ isActive: false, label: null });
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Fast inner dot spring
  const dotX = useSpring(x, { stiffness: 800, damping: 40, mass: 0.1 });
  const dotY = useSpring(y, { stiffness: 800, damping: 40, mass: 0.1 });

  // Smooth trailing pill spring
  const pillX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.25 });
  const pillY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.25 });

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);

      const target = event.target as HTMLElement | null;
      const projectCard = target?.closest("[data-project-card], .project-card");
      const button = target?.closest("button, a.btn, [role='button']");
      const link = target?.closest("a");
      const input = target?.closest("input, textarea");

      if (projectCard) {
        setCursorState({ isActive: true, label: "VIEW CASE STUDY →" });
      } else if (button || link) {
        const text = link?.getAttribute("aria-label") || link?.textContent || "";
        if (text.toLowerCase().includes("resume")) {
          setCursorState({ isActive: true, label: "GET RESUME ↓" });
        } else if (text.toLowerCase().includes("talk") || text.toLowerCase().includes("contact")) {
          setCursorState({ isActive: true, label: "LET'S TALK ✨" });
        } else {
          setCursorState({ isActive: true, label: null });
        }
      } else if (input) {
        setCursorState({ isActive: true, label: "TYPE" });
      } else {
        setCursorState({ isActive: false, label: null });
      }
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer Context-Aware Pill / Halo */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden lg:block"
        style={{ x: pillX, y: pillY }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-cyan-400/60 bg-[#090C12]/90 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.35)]"
          animate={{
            x: cursorState.label ? -60 : cursorState.isActive ? -22 : -14,
            y: cursorState.label ? -16 : cursorState.isActive ? -22 : -14,
            width: cursorState.label ? "auto" : cursorState.isActive ? 44 : 28,
            height: cursorState.label ? 32 : cursorState.isActive ? 44 : 28,
            paddingLeft: cursorState.label ? 14 : 0,
            paddingRight: cursorState.label ? 14 : 0,
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <AnimatePresence mode="wait">
            {cursorState.label && (
              <motion.span
                key={cursorState.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="whitespace-nowrap font-mono text-[10px] font-bold tracking-wider text-cyan-400 uppercase"
              >
                {cursorState.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Inner Electric Cyan Core Dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[71] hidden lg:block"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="rounded-full bg-cyan-400 shadow-[0_0_8px_#00F0FF]"
          animate={{
            width: 6,
            height: 6,
            x: -3,
            y: -3,
            opacity: isVisible && !cursorState.label ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 600, damping: 35 }}
        />
      </motion.div>
    </>
  );
}
