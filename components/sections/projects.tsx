import { ProjectCard } from "@/components/sections/project-card";
import { SectionHeader } from "@/components/sections/section-header";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="section shell">
      <SectionHeader
        index="03"
        eyebrow="Selected work"
        title="Ten projects, start to finish"
        description="Web, blockchain, and SaaS products built for startups and agencies, several for U.S.-based teams. Each one opens into a full case study."
      />

      <ul className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal
            as="li"
            key={project.id}
            delay={0.05 * (index % 3)}
            className={cn(
              "h-full",
              /* When the count is odd on a 2-col layout, the last card would
                 sit alone. Spanning it full-width avoids the orphan gap. On the
                 3-col layout (xl) it returns to 1-col since 9 ÷ 3 is even. */
              index === projects.length - 1 && projects.length % 2 !== 0
                && "sm:col-span-2 xl:col-span-1",
            )}
          >
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
