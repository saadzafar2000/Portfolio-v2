import "server-only";

import { capabilities } from "@/lib/data/capabilities";
import { education } from "@/lib/data/education";
import { experience } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/data/site";
import { skillGroups } from "@/lib/data/skills";
import type {
  Capability,
  EducationItem,
  ExperienceItem,
  Project,
  SiteSettings,
  SkillGroup,
} from "@/lib/types";

/**
 * The content API.
 *
 * Everything the site renders comes through these getters — no page or
 * component reaches into `lib/data/*` directly. They are async on purpose:
 * that is what makes the eventual move to Sanity a change to *this file only*,
 * with every call site already written to await its data.
 *
 * To move to Sanity, each body becomes roughly:
 *
 *   return sanityClient.fetch(groq`*[_type == "project"] | order(order asc)`)
 *
 * Callers do not change.
 */

export async function getSiteSettings(): Promise<SiteSettings> {
  return site;
}

export async function getProjects(): Promise<Project[]> {
  return [...projects].sort((a, b) => a.order - b.order);
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((project) => project.slug === slug) ?? null;
}

/**
 * The next project in display order, wrapping at the end. Powers the
 * "next project" link at the foot of each case study.
 */
export async function getAdjacentProject(slug: string): Promise<Project | null> {
  const ordered = await getProjects();
  if (ordered.length < 2) return null;

  const index = ordered.findIndex((project) => project.slug === slug);
  if (index === -1) return null;

  return ordered[(index + 1) % ordered.length];
}

export async function getExperience(): Promise<ExperienceItem[]> {
  return experience;
}

export async function getEducation(): Promise<EducationItem[]> {
  return education;
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  return skillGroups;
}

export async function getCapabilities(): Promise<Capability[]> {
  return capabilities;
}
