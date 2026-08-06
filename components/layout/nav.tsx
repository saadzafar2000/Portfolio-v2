"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Action } from "@/components/ui/action";
import { Logo } from "@/components/ui/logo";
import { Magnetic } from "@/components/ui/magnetic";
import { cn, ordinal } from "@/lib/utils";

/** Mirrors the section order rendered by app/page.tsx. */
const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export function Nav({ name }: { name: string }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isLanding = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [observedId, setObservedId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Derived, not stored — off the landing page there are no sections to track.
  const activeId = isLanding ? observedId : null;

  /**
   * On the landing page these are plain in-page anchors, so Lenis intercepts
   * and smooth-scrolls them. From a case study they have to be full routes back
   * to the landing page with a hash.
   */
  const hrefFor = (id: string) => (isLanding ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isLanding) return;

    const targets = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    if (targets.length === 0) return;

    /**
     * Track every section currently crossing the middle band, not just the
     * latest callback. Reading only the newest entries leaves the last match
     * stuck highlighted once you scroll off it.
     */
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ratios.set(entry.target.id, entry.intersectionRatio);
          } else {
            ratios.delete(entry.target.id);
          }
        }

        const best = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0];
        setObservedId(best ? best[0] : null);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [isLanding]);

  // Lock the page while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  /**
   * Dialog behaviour for the mobile menu. Focus moves into the panel on open,
   * Tab cycles through everything sitting above the overlay — the header
   * controls plus the panel — Escape closes, and focus returns to the toggle.
   *
   * The header is included in the cycle because it renders at z-50, above the
   * z-40 overlay: the logo and the close button stay visible and must stay
   * reachable. Everything behind the overlay is excluded.
   */
  useEffect(() => {
    if (!isMenuOpen) return;

    const panel = panelRef.current;
    // The toggle renders unconditionally and never unmounts while the nav is
    // mounted, so capturing it here is the same node the cleanup wants.
    const toggle = toggleRef.current;
    panel?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = [
        ...(headerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
        ...(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
        // Drops the md-and-up links and CTA, which are display:none here.
      ].filter((node) => node.offsetParent !== null);

      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      toggle?.focus();
    };
  }, [isMenuOpen]);

  if (pathname.startsWith("/demo")) return null;

  return (
    <>
      {/* Floating glass bar — detached from the viewport edges. */}
      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5">
        <div className="shell">
          <div
            ref={headerRef}
            className={cn(
              "flex items-center justify-between gap-4 rounded-2xl px-3 py-2.5 sm:px-4",
              "transition-[background-color,border-color,box-shadow] duration-500 ease-editorial",
              isScrolled && !isMenuOpen
                ? "border border-white/10 bg-black/40 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
                : "border border-transparent bg-transparent",
            )}
          >
            <Logo name={name} onClick={() => setIsMenuOpen(false)} />

            {/* Tighter padding at md so five links plus the CTA still fit on
                one line at 768px. */}
            <nav className="hidden items-center gap-1 md:flex">
              {SECTIONS.map(({ id, label }) => (
                <Magnetic key={id} strength={0.22}>
                  <Link
                    href={hrefFor(id) as Route}
                    aria-current={activeId === id ? "true" : undefined}
                    className={cn(
                      "relative px-3 py-2 text-sm transition-colors duration-500 ease-editorial lg:px-4",
                      activeId === id
                        ? "text-accent"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {label}
                    {activeId === id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2 -bottom-0.5 h-px bg-accent shadow-[0_0_10px_rgba(0,240,255,0.7)] lg:inset-x-3"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    )}
                  </Link>
                </Magnetic>
              ))}
            </nav>

            <div className="hidden md:block">
              <Action
                href={hrefFor("contact")}
                variant="solid"
                arrow={false}
                className="px-5 py-2.5 lg:px-6 lg:py-3"
              >
                Let&apos;s Talk
              </Action>
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={cn(
                  "block h-px w-6 bg-ink transition-transform duration-500 ease-editorial",
                  isMenuOpen && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-6 bg-ink transition-transform duration-500 ease-editorial",
                  isMenuOpen && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            className="fixed inset-0 z-40 bg-canvas/95 backdrop-blur-xl outline-none md:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="shell flex h-full flex-col justify-center gap-2 pb-16">
              {SECTIONS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.06 + index * 0.05,
                    type: "spring",
                    stiffness: 220,
                    damping: 26,
                  }}
                >
                  <Link
                    href={hrefFor(item.id) as Route}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-white/10 py-5"
                  >
                    <span className="label">{ordinal(index)}</span>
                    <span className="font-display text-h3 font-bold tracking-tight transition-colors duration-500 ease-editorial group-hover:text-accent">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="mt-10"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.06 + SECTIONS.length * 0.05,
                  type: "spring",
                  stiffness: 220,
                  damping: 26,
                }}
              >
                <Action
                  href={hrefFor("contact")}
                  variant="solid"
                  arrow={false}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full"
                >
                  Let&apos;s Talk
                </Action>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
