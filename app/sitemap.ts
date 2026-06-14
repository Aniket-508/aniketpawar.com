import type { MetadataRoute } from "next";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getCraftSlugs } from "@/lib/crafts";
import { getExperienceSlugs } from "@/lib/experiences";
import { getProjectSlugs } from "@/lib/projects";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = getProjectSlugs().map((slug) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
    priority: 0.8,
    url: absoluteUrl(`${ROUTES.PROJECTS}/${slug}`),
  }));

  const craftEntries = getCraftSlugs().map((slug) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
    priority: 0.7,
    url: absoluteUrl(`${ROUTES.CRAFTS}/${slug}`),
  }));

  const experienceEntries = getExperienceSlugs().map((slug) => ({
    changeFrequency: "monthly" as const,
    lastModified: new Date(),
    priority: 0.7,
    url: absoluteUrl(`${ROUTES.EXPERIENCES}/${slug}`),
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
      url: absoluteUrl(ROUTES.PROJECTS),
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.9,
      url: absoluteUrl(ROUTES.CRAFTS),
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.9,
      url: absoluteUrl(ROUTES.EXPERIENCES),
    },
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.9,
      url: absoluteUrl(ROUTES.STACK),
    },
    ...projectEntries,
    ...craftEntries,
    ...experienceEntries,
  ];
}
