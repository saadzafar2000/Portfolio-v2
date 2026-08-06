import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Two-digit run-in number, e.g. "01". */
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <div className="flex items-center gap-4">
        <span className="label text-accent">{index}</span>
        <span className="h-px flex-1 bg-line/10 sm:max-w-24" aria-hidden />
        <span className="label">{eyebrow}</span>
      </div>
      <h2 className="mt-8 font-display text-h2 font-bold text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-prose text-lead text-ink-muted text-pretty">
          {description}
        </p>
      )}
    </Reveal>
  );
}
