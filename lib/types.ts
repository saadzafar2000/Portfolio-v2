/**
 * Content types.
 *
 * These describe the *shape* of the data, not its source. Today `lib/content.ts`
 * resolves them from `lib/data/*`; swapping in a Sanity client later means
 * rewriting the bodies of the getters and nothing else, so every field here is
 * a plain serializable value that a GROQ projection could return.
 */

export type SocialKind =
  | "github"
  | "linkedin"
  | "email"
  | "twitter"
  | "instagram";

export interface SocialLink {
  kind: SocialKind;
  label: string;
  /** Display form, e.g. "github.com/saadzafar2000" */
  handle: string;
  href: string;
}

/**
 * Search-surface copy.
 *
 * Kept in the content layer rather than composed inside `generateMetadata` so
 * the page title is editable without touching a route file — and so the eventual
 * Sanity move can hand an editor the title and description directly.
 */
export interface SiteSeo {
  title: string;
  description: string;
  keywords: string[];
}

/** A single row of the hero's availability ledger. */
export interface HeroFact {
  label: string;
  value: string;
}

export interface SiteSettings {
  name: string;
  role: string;
  location: string;
  email: string;
  /** One-line positioning statement used in the hero. */
  tagline: string;
  /** Single-sentence bio. The only place this text lives. */
  bioShort: string;
  /** Long-form bio paragraphs, rendered in the About section. */
  bioLong: string[];
  availability: string;
  /**
   * Every job title claimed, rendered as Person JSON-LD `jobTitle`. An array
   * because the positioning is deliberately two-sided — a Werkstudent hire and
   * a freelance contract are different searches.
   */
  jobTitles: string[];
  /**
   * The hero ledger, minus the location row — that one renders from
   * `location` so the country is stated in exactly one place.
   */
  heroFacts: HeroFact[];
  resumeUrl: string;
  /** Canonical origin, no trailing slash. */
  url: string;
  socials: SocialLink[];
  seo: SiteSeo;
}

export interface CaseStudy {
  problem: string;
  approach: string;
  outcome: string;
}

/**
 * A headline engineering fact for the case study.
 *
 * `value` is rendered large, so it wants to be short — a number, a chain name,
 * an award code. `note` carries the qualifier underneath.
 */
export interface ProjectMetric {
  label: string;
  value: string;
  note: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface Project {
  /** Stable id. Mirrors Sanity's `_id`. */
  id: string;
  slug: string;
  /** Short display name. Renders as the card <h3> and the case study <h1>. */
  title: string;
  /**
   * Long descriptive title, used only for <title> and OG/Twitter metadata.
   * Falls back to `title` when absent — the visible headings never use this,
   * so the work grid stays typographically even.
   */
  seoTitle?: string;
  /** One-line description used on the work index. */
  summary: string;
  /** Longer description used at the top of the case study. */
  description: string;
  category: string;
  year: string;
  role: string;
  cover: GalleryImage;
  /**
   * Optional dual-theme preview. When BOTH are present, the card and the case
   * study hero render a Dark/Light switch instead of a static cover.
   *
   * `cover` must mirror `darkImage`: it remains the single source for OG images
   * and JSON-LD, neither of which can switch themes.
   */
  darkImage?: GalleryImage;
  lightImage?: GalleryImage;
  gallery: GalleryImage[];
  stack: string[];
  demoUrl?: string;
  githubUrl?: string;
  /** Ascending display order on the work index. */
  order: number;
  caseStudy: CaseStudy;
  /** Rendered as the "Key engineering metrics" band. Empty hides the section. */
  metrics: ProjectMetric[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  description: string;
  achievements: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  qualification: string;
  institution: string;
  description: string;
  award?: string;
}

export interface Skill {
  name: string;
  icon: string;
  docs: string;
  /** Icon is dark-on-transparent and needs a light plate to stay legible. */
  needsPlate: boolean;
}

export interface SkillGroup {
  label: string;
  items: Skill[];
}

/** Keys map to a lucide icon in `components/sections/capabilities.tsx`. */
export type CapabilityIcon =
  | "code"
  | "blocks"
  | "cloud"
  | "database"
  | "layout"
  | "zap"
  | "shield"
  | "compass";

export interface Capability {
  title: string;
  description: string;
  icon: CapabilityIcon;
}
