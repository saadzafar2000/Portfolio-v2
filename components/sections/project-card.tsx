import { ArrowUpRight } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ThemePreview } from "@/components/ui/theme-preview";
import type { Project } from "@/lib/types";
import { ordinal } from "@/lib/utils";

const COVER_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw";
const COVER_CLASS = "aspect-[16/10] w-full object-cover object-top";

/**
 * Server component. The only interactivity is CSS hover plus the cursor
 * spotlight, which lives in SpotlightCard — so the card itself ships no JS,
 * unless the project carries a dual-theme preview.
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <SpotlightCard as="article" className="h-full" data-project-card="true">
      <div className="flex h-full flex-col">
        <div className="relative overflow-hidden">
          {project.darkImage && project.lightImage ? (
            <ThemePreview
              dark={project.darkImage}
              light={project.lightImage}
              width={1200}
              height={750}
              sizes={COVER_SIZES}
              imageClassName={COVER_CLASS}
            />
          ) : (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={1200}
              height={750}
              sizes={COVER_SIZES}
              className={`${COVER_CLASS} transition-transform duration-500 group-hover:scale-105`}
            />
          )}
          {/* Fades the shot into the card body so it reads as one surface. */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas-raised via-canvas-raised/10 to-transparent" />
          {/* Sits on top of the screenshot, which may be a white page — so the
              chip carries its own opaque ground and full-strength ink rather
              than inheriting .label's faint colour on a 50% black wash. */}
          <span className="label absolute left-5 top-5 rounded-full border border-white/20 bg-canvas/90 px-3 py-1 text-ink backdrop-blur-md">
            {ordinal(index)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6 lg:p-7">
          <div className="flex items-center justify-between gap-4">
            <span className="label">
              {project.category} · {project.year}
            </span>
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          </div>

          <h3 className="mt-4 font-display text-h3 font-bold tracking-tight">
            <Link
              href={`/projects/${project.slug}` as Route}
              className="transition-colors duration-500 ease-editorial group-hover:text-accent"
            >
              {/* Stretched link — the whole card is the hit target, but the
                  accessible name stays on the real anchor. */}
              <span className="absolute inset-0 z-20" aria-hidden />
              {project.title}
            </Link>
          </h3>

          <p className="mt-3 flex-1 text-sm text-ink-muted text-pretty">
            {project.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((item) => (
              <li key={item} className="pill">
                {item}
              </li>
            ))}
            {project.stack.length > 4 && (
              <li className="pill">+{project.stack.length - 4}</li>
            )}
          </ul>
        </div>
      </div>
    </SpotlightCard>
  );
}
