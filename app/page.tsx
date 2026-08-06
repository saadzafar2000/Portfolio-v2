import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import {
  getCapabilities,
  getEducation,
  getExperience,
  getProjects,
  getSiteSettings,
  getSkillGroups,
} from "@/lib/content";

/**
 * Server component. Every section receives plain data as props — the only
 * client boundaries below here are the ones that genuinely need interaction
 * (the nav, the spotlight cards, the contact form, the reveal wrappers).
 */
export default async function HomePage() {
  const [site, projects, experience, education, capabilities, skillGroups] =
    await Promise.all([
      getSiteSettings(),
      getProjects(),
      getExperience(),
      getEducation(),
      getCapabilities(),
      getSkillGroups(),
    ]);

  return (
    <>
      <Hero site={site} />
      <About site={site} education={education} capabilities={capabilities} />
      <Experience items={experience} />
      <Projects projects={projects} />
      <Stack groups={skillGroups} />
      <Contact site={site} />
    </>
  );
}
