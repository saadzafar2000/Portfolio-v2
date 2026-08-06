import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";
import type { ExperienceItem } from "@/lib/types";

/**
 * Left-aligned editorial list. The previous build alternated cards either side
 * of a centred gradient spine, which forced the entire card markup to be
 * duplicated behind `hidden lg:block` / `block lg:hidden`. One layout now.
 */
export function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <section id="experience" className="section shell">
      <SectionHeader
        index="02"
        eyebrow="Experience"
        title="Where I've built things"
      />

      <ul className="mt-16">
        {items.map((item, index) => (
          <Reveal as="li" key={item.id} delay={index * 0.08}>
            <article className="grid gap-6 border-t border-white/10 py-10 md:grid-cols-12 md:gap-10 md:py-14">
              <div className="md:col-span-3">
                <p className="label whitespace-nowrap">
                  {item.start} — {item.end}
                </p>
                <p className="mt-3 text-sm text-ink-faint">{item.location}</p>
              </div>

              <div className="md:col-span-9">
                <h3 className="font-display text-h3 font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 font-mono text-lead text-accent">
                  {item.company}
                </p>
                <p className="mt-6 max-w-prose text-base text-ink-muted text-pretty">
                  {item.description}
                </p>

                <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {item.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex gap-3 text-sm text-ink-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.6em] h-px w-3 shrink-0 bg-accent/60"
                      />
                      <span className="text-pretty">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
        <li aria-hidden className="rule" />
      </ul>
    </section>
  );
}
