import { ArrowLeft, Github, Globe } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Gallery } from "@/components/case-study/gallery";
import { NextProject } from "@/components/case-study/next-project";
import { Action } from "@/components/ui/action";
import { KineticText } from "@/components/ui/kinetic-text";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ThemePreview } from "@/components/ui/theme-preview";
import {
  getAdjacentProject,
  getProject,
  getProjects,
  getSiteSettings,
} from "@/lib/content";
import { groupStackByLayer } from "@/lib/stack-layers";

const HERO_SIZES = "(max-width: 1440px) 100vw, 1344px";
const HERO_CLASS = "aspect-[16/9] w-full object-cover object-top";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [project, site] = await Promise.all([
    getProject(slug),
    getSiteSettings(),
  ]);

  if (!project) return { title: "Project not found" };

  const url = `${site.url}/projects/${project.slug}`;
  // Long descriptive form for the search surface only — the <h1> below stays
  // short so the case study reads as a title, not a meta description.
  const title = project.seoTitle ?? project.title;

  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${title} — ${site.name}`,
      description: project.description,
      images: [
        {
          url: project.cover.src,
          width: 1200,
          height: 630,
          alt: project.cover.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description: project.description,
      images: [project.cover.src],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, site, next] = await Promise.all([
    getProject(slug),
    getSiteSettings(),
    getAdjacentProject(slug),
  ]);

  if (!project) notFound();

  const architecture = groupStackByLayer(project.stack);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.description,
    url: `${site.url}/projects/${project.slug}`,
    image: `${site.url}${project.cover.src}`,
    dateCreated: project.year,
    genre: project.category,
    keywords: project.stack.join(", "),
    author: { "@type": "Person", name: site.name, url: site.url },
    creator: { "@type": "Person", name: site.name, url: site.url },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Overview                                                          */}
      {/* ---------------------------------------------------------------- */}
      <header className="shell pb-16 pt-[calc(var(--nav-height)+4rem)]">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2.5 text-sm text-ink-muted transition-colors duration-500 ease-editorial hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-500 ease-editorial group-hover:-translate-x-1" />
          All projects
        </Link>

        <p className="label mt-12">
          {project.category} · {project.year}
        </p>

        <h1 className="mt-6 max-w-5xl font-display text-h1 font-bold">
          <KineticText lines={[project.title]} immediate delay={0.1} />
        </h1>

        <Reveal y={16} delay={0.4}>
          <p className="mt-8 max-w-2xl text-lead text-ink-muted text-pretty">
            {project.description}
          </p>
        </Reveal>

        <Reveal y={16} delay={0.5}>
          <dl className="mt-14 grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="label">Role</dt>
              <dd className="mt-3 text-sm text-ink">{project.role}</dd>
            </div>
            <div>
              <dt className="label">Year</dt>
              <dd className="mt-3 text-sm text-ink">{project.year}</dd>
            </div>
            <div>
              <dt className="label">Category</dt>
              <dd className="mt-3 text-sm text-ink">{project.category}</dd>
            </div>
            <div>
              <dt className="label">Stack</dt>
              <dd className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-ink">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        {(project.demoUrl || project.githubUrl) && (
          <Reveal y={16} delay={0.6} className="mt-12 flex flex-wrap gap-3">
            {project.demoUrl && (
              <Action href={project.demoUrl} variant="solid" arrow={false}>
                <span className="inline-flex items-center gap-2.5">
                  <Globe aria-hidden className="h-4 w-4" />
                  Live Demo
                </span>
              </Action>
            )}
            {project.githubUrl && (
              <Action href={project.githubUrl} variant="outline" arrow={false}>
                <span className="inline-flex items-center gap-2.5">
                  <Github aria-hidden className="h-4 w-4" />
                  GitHub
                </span>
              </Action>
            )}
          </Reveal>
        )}
      </header>

      <Reveal className="shell">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          {project.darkImage && project.lightImage ? (
            <ThemePreview
              dark={project.darkImage}
              light={project.lightImage}
              width={2400}
              height={1350}
              sizes={HERO_SIZES}
              priority
              imageClassName={HERO_CLASS}
            />
          ) : (
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={2400}
              height={1350}
              sizes={HERO_SIZES}
              priority
              className={HERO_CLASS}
            />
          )}
        </div>
      </Reveal>

      {/* ---------------------------------------------------------------- */}
      {/* Key engineering metrics                                           */}
      {/* ---------------------------------------------------------------- */}
      {project.metrics.length > 0 && (
        <section className="shell pt-[var(--section-gap)]">
          <Reveal>
            <h2 className="label">Key engineering metrics</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.metrics.map((metric, index) => (
              <Reveal key={metric.label} delay={index * 0.06}>
                <SpotlightCard className="h-full p-7">
                  <p className="label">{metric.label}</p>
                  <p className="mt-5 font-display text-h3 font-bold tracking-tight text-accent">
                    {metric.value}
                  </p>
                  <p className="mt-3 text-sm text-ink-muted text-pretty">
                    {metric.note}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Problem & Solution                                                */}
      {/* ---------------------------------------------------------------- */}
      <div className="shell section">
        {[
          { label: "The problem", body: project.caseStudy.problem },
          { label: "The solution", body: project.caseStudy.approach },
          { label: "The outcome", body: project.caseStudy.outcome },
        ].map((section, index) => (
          <Reveal key={section.label} delay={index * 0.05}>
            <div className="grid gap-6 border-t border-white/10 py-12 md:grid-cols-12 md:gap-12">
              <h2 className="label md:col-span-3">{section.label}</h2>
              <p className="max-w-prose text-lead text-ink-muted text-pretty md:col-span-9">
                {section.body}
              </p>
            </div>
          </Reveal>
        ))}

        {/* -------------------------------------------------------------- */}
        {/* Architecture & stack breakdown                                  */}
        {/* -------------------------------------------------------------- */}
        <Reveal>
          <div className="grid gap-6 border-t border-white/10 py-12 md:grid-cols-12 md:gap-12">
            <h2 className="label md:col-span-3">Architecture</h2>
            <div className="md:col-span-9">
              <ul className="space-y-6">
                {architecture.map((group) => (
                  <li
                    key={group.layer}
                    className="grid gap-3 sm:grid-cols-4 sm:gap-6"
                  >
                    <span className="font-display text-base font-bold text-ink sm:col-span-1">
                      {group.layer}
                    </span>
                    <ul className="flex flex-wrap gap-2 sm:col-span-3">
                      {group.items.map((item) => (
                        <li key={item} className="pill">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* -------------------------------------------------------------- */}
        {/* Gallery                                                         */}
        {/* -------------------------------------------------------------- */}
        {project.gallery.length > 1 && (
          <Reveal className="mt-16">
            <h2 className="label">Gallery</h2>
            <div className="mt-8">
              <Gallery images={project.gallery} title={project.title} />
            </div>
          </Reveal>
        )}
      </div>

      {next && <NextProject project={next} />}
    </article>
  );
}
