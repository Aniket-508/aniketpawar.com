import { ROUTES } from "@/constants/routes";
import { getCraftSlugs } from "@/lib/crafts";
import { getExperienceSlugs } from "@/lib/experiences";
import { getProjectSlugs } from "@/lib/projects";

import { getLlmsHeader, getLlmsSections, formatLlmsSection } from "./catalog";
import {
  buildCraftsIndexMarkdown,
  buildExperiencesIndexMarkdown,
  buildHomeMarkdown,
  buildProjectsIndexMarkdown,
  buildSlugDocumentMarkdown,
} from "./pages";

const SECTION_SEPARATOR = "\n\n---\n\n";

export const buildLlmsTxt = (): string => {
  const sections = getLlmsSections().map(formatLlmsSection).join("\n\n");
  return `${getLlmsHeader()}${sections}\n`;
};

const appendDocument = async (
  parts: string[],
  label: string,
  build: () => Promise<string | null> | string | null
): Promise<void> => {
  const content = await build();
  if (!content) {
    return;
  }
  parts.push(`# ${label}\n\n${content}`);
};

export const buildLlmsFullTxt = async (): Promise<string> => {
  const parts: string[] = [
    getLlmsHeader().trim(),
    `# Home\n\n${buildHomeMarkdown().trim()}`,
    `# Projects index\n\n${buildProjectsIndexMarkdown().trim()}`,
  ];

  for (const slug of getProjectSlugs()) {
    await appendDocument(parts, `Project: ${slug}`, () =>
      buildSlugDocumentMarkdown({
        collection: "projects",
        routePrefix: ROUTES.PROJECTS,
        slug,
      })
    );
  }

  parts.push(`# Crafts index\n\n${buildCraftsIndexMarkdown().trim()}`);

  for (const slug of getCraftSlugs()) {
    await appendDocument(parts, `Craft: ${slug}`, () =>
      buildSlugDocumentMarkdown({
        collection: "crafts",
        routePrefix: ROUTES.CRAFTS,
        slug,
      })
    );
  }

  parts.push(
    `# Experiences index\n\n${buildExperiencesIndexMarkdown().trim()}`
  );

  for (const slug of getExperienceSlugs()) {
    await appendDocument(parts, `Experience: ${slug}`, () =>
      buildSlugDocumentMarkdown({
        collection: "experiences",
        routePrefix: ROUTES.EXPERIENCES,
        slug,
      })
    );
  }

  return `${parts.join(SECTION_SEPARATOR)}\n`;
};
