import type { MetadataRoute } from "next";

import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getCraftSlugs } from "@/lib/crafts";
import { getExperienceSlugs } from "@/lib/experiences";
import { getProjectSlugs } from "@/lib/projects";
import { absoluteUrl } from "@/lib/utils";
import { getWritingSlugs } from "@/lib/writings";

const PRIORITY = {
  HOME: 1,
  INDEX: 0.9,
  PRIMARY: 0.8,
  SECONDARY: 0.7,
} as const;

type Priority = (typeof PRIORITY)[keyof typeof PRIORITY];

type SitemapEntry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entry = (url: string, priority: Priority): SitemapEntry => ({
    changeFrequency: "monthly",
    lastModified,
    priority,
    url,
  });

  const routeEntry = (route: string, priority: Priority): SitemapEntry =>
    entry(absoluteUrl(route), priority);

  const collectionEntries = (
    route: string,
    slugs: string[],
    priority: Priority
  ): SitemapEntry[] =>
    slugs.map((slug) => routeEntry(`${route}/${slug}`, priority));

  return [
    entry(SITE.URL, PRIORITY.HOME),

    routeEntry(ROUTES.PROJECTS, PRIORITY.INDEX),
    routeEntry(ROUTES.CRAFTS, PRIORITY.INDEX),
    routeEntry(ROUTES.EXPERIENCES, PRIORITY.INDEX),
    routeEntry(ROUTES.WRITING, PRIORITY.INDEX),
    routeEntry(ROUTES.USES, PRIORITY.INDEX),

    routeEntry(ROUTES.TESTIMONIALS, PRIORITY.PRIMARY),

    routeEntry(ROUTES.SPONSORS, PRIORITY.SECONDARY),
    routeEntry(ROUTES.COLOPHON, PRIORITY.SECONDARY),

    ...collectionEntries(ROUTES.PROJECTS, getProjectSlugs(), PRIORITY.PRIMARY),
    ...collectionEntries(ROUTES.CRAFTS, getCraftSlugs(), PRIORITY.SECONDARY),
    ...collectionEntries(
      ROUTES.EXPERIENCES,
      getExperienceSlugs(),
      PRIORITY.SECONDARY
    ),
    ...collectionEntries(ROUTES.WRITING, getWritingSlugs(), PRIORITY.SECONDARY),
  ];
}
