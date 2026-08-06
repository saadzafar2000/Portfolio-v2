import type { MetadataRoute } from "next";

import { getProjects, getSiteSettings } from "@/lib/content";

/**
 * Generated from the content layer, so adding a project adds its URL here.
 * Replaces the hand-written public/sitemap.xml, which listed `#hash` anchors —
 * those are not independently indexable URLs.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, projects] = await Promise.all([
    getSiteSettings(),
    getProjects(),
  ]);
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
