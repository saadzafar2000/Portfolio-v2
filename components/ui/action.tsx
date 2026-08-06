"use client";

import type { Route } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const VARIANTS: Record<Variant, string> = {
  // Primary cyan. The glow is the accent's only "loud" use on the page.
  solid:
    "border border-transparent bg-accent text-accent-ink font-semibold " +
    "shadow-[0_0_0_rgba(0,240,255,0)] hover:shadow-[0_0_24px_rgba(0,240,255,0.35)]",
  // Secondary ghost.
  outline:
    "border border-white/10 text-ink hover:border-cyan-500/40 hover:text-accent",
  ghost: "border border-transparent text-ink-muted hover:text-ink",
};

interface ActionProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
  /** Force the trailing arrow on or off. Defaults to on for external links. */
  arrow?: boolean;
  disabled?: boolean;
  download?: string;
  "aria-label"?: string;
}

const isExternal = (href: string) =>
  /^(https?:|mailto:|tel:)/.test(href) || href.startsWith("#");

/**
 * The one interactive control on the site. Renders as a Link, an anchor, or a
 * button depending on what it's given, so every clickable element gets the same
 * magnetic pull, arrow travel, and focus treatment.
 */
export function Action({
  children,
  href,
  onClick,
  type = "button",
  variant = "outline",
  className,
  arrow,
  disabled,
  download,
  ...rest
}: ActionProps) {
  const external = href ? isExternal(href) : false;
  const showArrow = arrow ?? (external && !href?.startsWith("#"));

  const classes = cn(
    "group/action inline-flex items-center justify-center gap-2.5 rounded-full",
    "px-7 py-3.5 text-sm font-medium",
    "transition-[color,background-color,border-color,box-shadow] duration-500 ease-editorial",
    "disabled:pointer-events-none disabled:opacity-45",
    VARIANTS[variant],
    className,
  );

  const inner = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-500 ease-editorial group-hover/action:translate-x-0.5 group-hover/action:-translate-y-0.5"
        />
      )}
    </>
  );

  if (href && (external || download)) {
    return (
      <Magnetic>
        <a
          href={href}
          onClick={onClick}
          download={download}
          target={external && !href.startsWith("#") ? "_blank" : undefined}
          rel={
            external && !href.startsWith("#") ? "noopener noreferrer" : undefined
          }
          className={classes}
          {...rest}
        >
          {inner}
        </a>
      </Magnetic>
    );
  }

  if (href) {
    return (
      <Magnetic>
        <Link
          href={href as Route}
          onClick={onClick}
          className={classes}
          {...rest}
        >
          {inner}
        </Link>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={classes}
        {...rest}
      >
        {inner}
      </button>
    </Magnetic>
  );
}
