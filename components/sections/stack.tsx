import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";
import type { SkillGroup } from "@/lib/types";

/**
 * Typographic rather than a logo grid — 40-odd remote SVGs from three CDNs was
 * the single largest network cost on the old page, and a wall of vendor marks
 * reads as generic. Each entry still links to that technology's docs.
 */
export function Stack({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="stack" className="section shell">
      <SectionHeader
        index="04"
        eyebrow="Stack"
        title="Tools I reach for"
        description="Linked through to each technology's documentation."
      />

      <div className="mt-16">
        {groups.map((group, index) => (
          <Reveal key={group.label} delay={index * 0.05}>
            <div className="grid gap-6 border-t border-white/10 py-9 md:grid-cols-12 md:gap-10">
              <p className="label md:col-span-3">{group.label}</p>
              <ul className="flex flex-wrap gap-x-7 gap-y-3.5 md:col-span-9">
                {group.items.map((skill) => (
                  <li key={skill.name}>
                    <a
                      href={skill.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-wipe text-base text-ink-muted transition-colors duration-500 ease-editorial hover:text-ink"
                    >
                      {skill.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
        <div aria-hidden className="rule" />
      </div>
    </section>
  );
}
