import { ArrowDown, Download } from "lucide-react";

import { Aurora } from "@/components/layout/aurora";
import { HeroLedger } from "@/components/sections/hero-ledger";
import { Action } from "@/components/ui/action";
import { KineticText } from "@/components/ui/kinetic-text";
import { Reveal } from "@/components/ui/reveal";
import { StatusDot } from "@/components/ui/status-dot";
import type { SiteSettings } from "@/lib/types";

/**
 * Lines are authored explicitly so the kinetic reveal can stagger words without
 * measuring text at runtime — which also means a line that wraps breaks the
 * intended structure. The longest line here is 13 characters, so it holds at the
 * 2.75rem floor of the type scale on a 390px phone.
 */
const HEADLINE = ["Full-stack &", "Web3 engineer", "who ships."];

export function Hero({ site }: { site: SiteSettings }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pb-10 pt-[calc(var(--nav-height)+2rem)]">
      <Aurora />

      {/* `my-auto` centres the content in whatever space is left over, which
          keeps the scroll cue below pinned to the bottom of the viewport rather
          than pushed past the fold once the content grows. */}
      <div className="shell my-auto">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal y={0} delay={0.1}>
              <p className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <StatusDot />
                  {site.availability}
                </span>
                <span aria-hidden className="text-ink-faint">
                  ·
                </span>
                <span className="label">{site.location}</span>
              </p>
            </Reveal>

            <h1 className="mt-10 font-display text-h1 font-bold">
              <KineticText lines={HEADLINE} immediate delay={0.2} />
            </h1>

            <Reveal y={16} delay={0.85} className="mt-10 max-w-xl">
              <p className="text-lead text-ink-muted text-pretty">
                Smart contracts on Ethereum, real-time systems in production,
                and Next.js applications shipped for clients across Europe and
                the U.S.
              </p>
            </Reveal>

            <Reveal
              y={16}
              delay={0.95}
              className="mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Action href="#projects" variant="solid" arrow={false} className="w-full sm:w-auto">
                View Work
              </Action>
              <Action
                href={site.resumeUrl}
                variant="outline"
                arrow={false}
                download="Muhammad_Saad_Zafar_Resume.pdf"
                className="w-full sm:w-auto"
              >
                <span className="inline-flex items-center justify-center gap-2.5">
                  <Download aria-hidden className="h-4 w-4" />
                  Download Resume
                </span>
              </Action>
            </Reveal>
          </div>

          <HeroLedger site={site} className="lg:col-span-5" />
        </div>
      </div>

      <div className="shell mt-16 shrink-0 flex justify-center">
        <a
          href="#projects"
          aria-label="Scroll to selected work"
          className="group inline-flex items-center gap-3 text-ink-faint transition-colors duration-500 ease-editorial hover:text-accent"
        >
          <span className="label">Scroll</span>
          <ArrowDown className="h-4 w-4 transition-transform duration-700 ease-editorial group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
