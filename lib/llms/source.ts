import { ROUTES } from "@/constants/routes";
import { getCraftBySlug, getCraftSlugs } from "@/lib/crafts";
import { getExperienceBySlug, getExperienceSlugs } from "@/lib/experiences";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { absoluteUrl } from "@/lib/utils";

import type { MdxCollection } from "./mdx";
import {
  buildCraftsIndexMarkdown,
  buildExperiencesIndexMarkdown,
  buildProjectsIndexMarkdown,
  buildSlugDocumentMarkdown,
} from "./pages";

export interface LlmsPage {
  description?: string;
  getMarkdown: () => Promise<string | null> | string;
  slugs: string[];
  title: string;
}

export const homeContentRoute = `${ROUTES.LLMS_MDX}/content.mdx` as const;

export const getPageMdxSegments = (page: LlmsPage): string[] => [
  ...page.slugs,
  "content.mdx",
];

export const getPageMdxUrl = (page: LlmsPage): string =>
  absoluteUrl(`${ROUTES.LLMS_MDX}/${page.slugs.join("/")}/content.mdx`);

export const getPublicMdxUrl = (path: string): string =>
  absoluteUrl(`${path}.mdx`);

export const getLLMText = async (page: LlmsPage): Promise<string> => {
  const body = await page.getMarkdown();
  if (!body) {
    return "";
  }

  const sections = [page.description, body].filter(Boolean);

  return `# ${page.title}\n\n${sections.join("\n\n")}`;
};

const addSlugPages = (
  pages: LlmsPage[],
  collection: MdxCollection,
  routePrefix: string,
  getSlugs: () => string[],
  getTitle: (slug: string) => string | undefined,
  getDescription: (slug: string) => string | undefined
): void => {
  for (const slug of getSlugs()) {
    const title = getTitle(slug);
    if (!title) {
      continue;
    }

    pages.push({
      description: getDescription(slug),
      getMarkdown: () =>
        buildSlugDocumentMarkdown({
          collection,
          routePrefix,
          slug,
        }),
      slugs: [...routePrefix.slice(1).split("/"), slug],
      title,
    });
  }
};

export const getLlmsPages = (): LlmsPage[] => {
  const pages: LlmsPage[] = [
    {
      description: "Selected work — open source tools, APIs, and products.",
      getMarkdown: buildProjectsIndexMarkdown,
      slugs: ["projects"],
      title: "Projects",
    },
    {
      description: "Motion and interaction experiments.",
      getMarkdown: buildCraftsIndexMarkdown,
      slugs: ["crafts"],
      title: "Crafts",
    },
    {
      description: "Professional experience and impact.",
      getMarkdown: buildExperiencesIndexMarkdown,
      slugs: ["experiences"],
      title: "Experiences",
    },
  ];

  addSlugPages(
    pages,
    "projects",
    ROUTES.PROJECTS,
    getProjectSlugs,
    (slug) => getProjectBySlug(slug)?.title,
    (slug) => getProjectBySlug(slug)?.description
  );

  addSlugPages(
    pages,
    "crafts",
    ROUTES.CRAFTS,
    getCraftSlugs,
    (slug) => getCraftBySlug(slug)?.title,
    (slug) => getCraftBySlug(slug)?.description
  );

  addSlugPages(
    pages,
    "experiences",
    ROUTES.EXPERIENCES,
    getExperienceSlugs,
    (slug) => getExperienceBySlug(slug)?.experienceOrg.name,
    (slug) => getExperienceBySlug(slug)?.experienceDescription[0]
  );

  return pages;
};

export const getLlmsPage = (
  slugs: string[] | undefined
): LlmsPage | undefined => {
  if (!slugs?.length) {
    return undefined;
  }

  const key = slugs.join("/");

  return getLlmsPages().find((page) => page.slugs.join("/") === key);
};
