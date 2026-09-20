import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getCraftBySlug, getCrafts } from "@/lib/crafts";
import { getExperienceBySlug, getExperiences } from "@/lib/experiences";
import {
  formatProjectDate,
  getProjectBySlug,
  getProjects,
} from "@/lib/projects";
import { absoluteUrl } from "@/lib/utils";

import { formatMdxDocument } from "./mdx";
import type { MdxCollection } from "./mdx";

export const buildHomeMarkdown = (): string => `# ${SITE.NAME}

${SITE.DESCRIPTION.LONG}

## Sections

- [Projects](${absoluteUrl(`${ROUTES.PROJECTS}.mdx`)}): Selected work — open source tools, APIs, and products.
- [Crafts](${absoluteUrl(`${ROUTES.CRAFTS}.mdx`)}): Motion and interaction experiments.
- [Experiences](${absoluteUrl(`${ROUTES.EXPERIENCES}.mdx`)}): Professional experience and impact.

## Machine-readable docs

- [llms.txt](${absoluteUrl(ROUTES.LLMS)}): Curated index for LLMs
- [llms-full.txt](${absoluteUrl(ROUTES.LLMS_FULL)}): Full site content in plain text
`;

const formatLinks = (links: {
  website?: string;
  github?: string;
  post?: string;
  preview?: string;
  linkedin?: string;
}): string => {
  const lines: string[] = [];
  if (links.website) {
    lines.push(`- Website: ${links.website}`);
  }
  if (links.github) {
    lines.push(`- GitHub: ${links.github}`);
  }
  if (links.post) {
    lines.push(`- Post: ${links.post}`);
  }
  if (links.preview) {
    lines.push(`- Preview: ${links.preview}`);
  }
  if (links.linkedin) {
    lines.push(`- LinkedIn: ${links.linkedin}`);
  }
  return lines.length > 0 ? `${lines.join("\n")}\n` : "";
};

export const buildProjectsIndexMarkdown = (): string => {
  const projects = getProjects();
  const entries = projects
    .map(
      (project) =>
        `## ${project.title}

${project.description}

- Category: ${project.category}
- Date: ${formatProjectDate(project.date)}
${formatLinks(project.links)}- MDX: ${absoluteUrl(`${ROUTES.PROJECTS}/${project.slug}.mdx`)}`
    )
    .join("\n\n");

  return `# Projects

Tools, APIs, and products I have built or maintain.

${entries}
`;
};

export const buildCraftsIndexMarkdown = (): string => {
  const crafts = getCrafts();
  const entries = crafts
    .map(
      (craft) =>
        `## ${craft.title}

${craft.description}

- Category: ${craft.category}
${formatLinks(craft.links)}- MDX: ${absoluteUrl(`${ROUTES.CRAFTS}/${craft.slug}.mdx`)}`
    )
    .join("\n\n");

  return `# Crafts

Motion and interaction experiments.

${entries}
`;
};

export const buildExperiencesIndexMarkdown = (): string => {
  const experiences = getExperiences();
  const entries = experiences
    .map((experience) => {
      const period = `${experience.experienceStatus.startAt} – ${experience.experienceStatus.endAt}`;
      return `## ${experience.experienceOrg.name}

${experience.experienceDescription.join("\n")}

- Category: ${experience.category}
- Period: ${period}
${formatLinks(experience.experienceLinks)}- MDX: ${absoluteUrl(`${ROUTES.EXPERIENCES}/${experience.slug}.mdx`)}`;
    })
    .join("\n\n");

  return `# Experiences

Professional experience and impact.

${entries}
`;
};

interface SlugDocumentOptions {
  collection: MdxCollection;
  routePrefix: string;
  slug: string;
}

export const buildSlugDocumentMarkdown = ({
  collection,
  routePrefix,
  slug,
}: SlugDocumentOptions): Promise<string | null> => {
  if (collection === "projects") {
    const project = getProjectBySlug(slug);
    if (!project) {
      return Promise.resolve(null);
    }
    return formatMdxDocument({
      collection,
      description: project.description,
      path: `${routePrefix}/${slug}`,
      slug,
      title: project.title,
    });
  }

  if (collection === "crafts") {
    const craft = getCraftBySlug(slug);
    if (!craft) {
      return Promise.resolve(null);
    }
    return formatMdxDocument({
      collection,
      description: craft.description,
      path: `${routePrefix}/${slug}`,
      slug,
      title: craft.title,
    });
  }

  const experience = getExperienceBySlug(slug);
  if (!experience) {
    return Promise.resolve(null);
  }

  return formatMdxDocument({
    collection,
    description: experience.experienceDescription[0] ?? "",
    path: `${routePrefix}/${slug}`,
    slug,
    title: experience.experienceOrg.name,
  });
};
