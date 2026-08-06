import {
  Blocks,
  Cloud,
  Code2,
  Compass,
  Database,
  LayoutGrid,
  MapPin,
  Shield,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { StatusDot } from "@/components/ui/status-dot";
import type {
  Capability,
  CapabilityIcon,
  EducationItem,
  SiteSettings,
} from "@/lib/types";
import { ordinal } from "@/lib/utils";

/** Data carries an icon *key*; the mapping to a component lives here. */
const ICONS: Record<CapabilityIcon, LucideIcon> = {
  code: Code2,
  blocks: Blocks,
  cloud: Cloud,
  database: Database,
  layout: LayoutGrid,
  zap: Zap,
  shield: Shield,
  compass: Compass,
};

interface AboutProps {
  site: SiteSettings;
  education: EducationItem[];
  capabilities: Capability[];
}

/**
 * Bento grid. Cell spans are declared per-cell so the composition stays
 * asymmetric on wide screens and collapses to a single column on mobile.
 */
export function About({ site, education, capabilities }: AboutProps) {
  return (
    <section id="about" className="section shell">
      <SectionHeader
        index="01"
        eyebrow="About"
        title="Who you'd be working with"
      />

      {/* Two columns at the base width so the eight capability cells sit 2-up on
          a phone instead of stacking into an eleven-card scroll. The prose cells
          span both. Every md/lg span is unchanged. */}
      <div className="mt-16 grid auto-rows-auto grid-cols-2 gap-4 md:grid-cols-6 lg:grid-cols-12">
        {/* Bio — the anchor cell, spanning both rows of the right column. */}
        <Reveal className="col-span-2 md:col-span-6 lg:col-span-7 lg:row-span-2">
          <SpotlightCard className="h-full p-7 lg:p-9">
            <p className="label">Profile</p>
            <div className="mt-6 max-w-prose space-y-5">
              {site.bioLong.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "text-lead text-ink text-pretty"
                      : "text-base text-ink-muted text-pretty"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Status cell. */}
        <Reveal delay={0.06} className="col-span-2 md:col-span-3 lg:col-span-5">
          <SpotlightCard className="flex h-full flex-col p-7 lg:p-9">
            <p className="label">Currently</p>
            <p className="mt-6 flex items-start gap-2.5 text-lead text-ink text-pretty">
              <StatusDot />
              {site.availability}
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-ink-muted">
              <MapPin aria-hidden className="h-4 w-4 shrink-0 text-accent" />
              {site.location}
            </p>
            <p className="mt-auto border-t border-white/10 pt-6 text-sm text-ink-muted text-pretty">
              {site.bioShort}
            </p>
          </SpotlightCard>
        </Reveal>

        {/* Education cell. */}
        <Reveal delay={0.06} className="col-span-2 md:col-span-3 lg:col-span-5">
          <SpotlightCard className="h-full p-7 lg:p-9">
            <p className="label">Education</p>
            <ul className="mt-6 space-y-6">
              {education.map((item) => (
                <li key={item.id}>
                  <p className="label">{item.period}</p>
                  <h3 className="mt-2 font-display text-lead font-bold text-balance">
                    {item.qualification}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">
                    {item.institution}
                  </p>
                  {item.award && (
                    <p className="mt-3 inline-flex rounded-full border border-cyan-500/30 px-3 py-1 font-mono text-label uppercase tracking-[0.1em] text-accent">
                      {item.award}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>

        {/* Capabilities — the small cells that give the bento its rhythm. */}
        {capabilities.map((capability, index) => {
          const Icon = ICONS[capability.icon];
          return (
            <Reveal
              key={capability.title}
              delay={0.04 * (index % 4)}
              className="col-span-1 md:col-span-3 lg:col-span-3"
            >
              <SpotlightCard className="h-full p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <Icon
                    aria-hidden
                    className="h-5 w-5 text-accent"
                    strokeWidth={1.5}
                  />
                  <span className="label">{ordinal(index)}</span>
                </div>
                <h3 className="mt-6 font-display text-lead font-bold text-balance md:mt-8">
                  {capability.title}
                </h3>
                {/* At ~167px wide on a phone these tiles can carry a title or a
                    description legibly, not both. The title is the scannable
                    half, so the prose returns at md. */}
                <p className="mt-3 hidden text-sm text-ink-muted text-pretty md:block">
                  {capability.description}
                </p>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
