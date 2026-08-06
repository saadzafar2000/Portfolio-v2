"use client";

import { useRef, type ElementType, type PointerEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Semantic element to render. Defaults to a div. */
  as?: "div" | "article" | "li" | "section";
}

/**
 * Bento cell with a cursor-tracking cyan spotlight.
 *
 * Writes --mx/--my as CSS custom properties straight onto the node rather than
 * holding pointer position in React state — this fires on every mousemove, and
 * re-rendering the subtree at that rate is what makes these effects janky. The
 * gradients themselves live in the `.spotlight` utility in globals.css.
 */
export function SpotlightCard({
  children,
  className,
  as = "div",
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (event: PointerEvent) => {
    const node = ref.current;
    if (!node || event.pointerType !== "mouse") return;

    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  // Widening to ElementType keeps the polymorphic `as` prop from collapsing
  // into an intersection of every element's props, which never type-checks.
  const Component = as as ElementType;

  return (
    <Component
      ref={ref}
      onPointerMove={handleMove}
      className={cn(
        "spotlight group relative overflow-hidden rounded-2xl",
        "border border-white/10 bg-canvas-raised/60 backdrop-blur-xl",
        "transition-colors duration-500 ease-editorial hover:border-cyan-500/40",
        className,
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
    </Component>
  );
}
