import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/lib/types";

export function NextProject({ project }: { project: Project }) {
  return (
    <section className="border-t border-white/10">
      <div className="shell py-20">
        <p className="label">Next project</p>

        <Link
          href={`/projects/${project.slug}` as Route}
          className="group mt-8 grid items-center gap-8 md:grid-cols-12"
        >
          <div className="md:col-span-8">
            <h2 className="font-display text-h1 font-bold tracking-tight transition-transform duration-700 ease-editorial md:group-hover:translate-x-3">
              {project.title}
            </h2>
            <p className="mt-5 flex items-center gap-4 text-ink-muted">
              <span className="label">
                {project.category} · {project.year}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-700 ease-editorial group-hover:translate-x-2 group-hover:text-accent" />
            </p>
          </div>

          <div className="md:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={project.cover.src}
                alt=""
                width={800}
                height={500}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]"
              />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
