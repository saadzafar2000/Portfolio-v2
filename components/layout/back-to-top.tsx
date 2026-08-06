"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href="#"
          aria-label="Back to top"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="group fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-canvas/80 backdrop-blur-md transition-colors duration-500 ease-editorial hover:border-cyan-500/40 hover:text-accent"
        >
          <ArrowUp className="h-4 w-4 transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
