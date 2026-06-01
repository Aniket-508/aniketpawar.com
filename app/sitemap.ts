import type { MetadataRoute } from "next";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getCraftSlugs } from "@/lib/crafts";
import { getExperienceSlugs } from "@/lib/experiences";
import { getProjectSlugs } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = getProjectSlugs().map((slug) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
    priority: 0.8,
    url: `${SITE.URL}${ROUTES.PROJECTS}/${slug}`,
  }));

  const craftEntries = getCraftSlugs().map((slug) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
    priority: 0.7,
    url: `${SITE.URL}${ROUTES.CRAFTS}/${slug}`,
  }));

  const experienceEntries = getExperienceSlugs().map((slug) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
    priority: 0.7,
    url: `${SITE.URL}${ROUTES.EXPERIENCES}/${slug}`,
  }));

  return [
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 1,
      url: SITE.URL,
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.9,
      url: `${SITE.URL}${ROUTES.PROJECTS}`,
    },
    ...projectEntries,
    ...craftEntries,
    ...experienceEntries,
  ];
}
