import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getCrafts } from "@/lib/crafts";
import { getExperiences } from "@/lib/experiences";
import { getPublicMdxUrl } from "@/lib/llms/source";
import { getProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/utils";

export interface LlmsLink {
  description?: string;
  title: string;
  url: string;
}

export interface LlmsSection {
  links: LlmsLink[];
  title: string;
}

const mdxUrl = (path: string): string => getPublicMdxUrl(path);

export const getLlmsSections = (): LlmsSection[] => [
  {
    links: [
      {
        description: "Homepage overview",
        title: "Home",
        url: mdxUrl("/index"),
      },
      {
        description: "Complete plain-text export",
        title: "Full content (llms-full.txt)",
        url: absoluteUrl(ROUTES.LLMS_FULL),
      },
    ],
    title: "Site",
  },
  {
    links: [
      {
        description: "All projects index",
        title: "Projects index",
        url: mdxUrl(ROUTES.PROJECTS),
      },
      ...getProjects().map((project) => ({
        description: project.description,
        title: project.title,
        url: mdxUrl(`${ROUTES.PROJECTS}/${project.slug}`),
      })),
    ],
    title: "Projects",
  },
  {
    links: [
      {
        description: "All crafts index",
        title: "Crafts index",
        url: mdxUrl(ROUTES.CRAFTS),
      },
      ...getCrafts().map((craft) => ({
        description: craft.description,
        title: craft.title,
        url: mdxUrl(`${ROUTES.CRAFTS}/${craft.slug}`),
      })),
    ],
    title: "Crafts",
  },
  {
    links: [
      {
        description: "All experiences index",
        title: "Experiences index",
        url: mdxUrl(ROUTES.EXPERIENCES),
      },
      ...getExperiences().map((experience) => ({
        description: experience.experienceDescription[0],
        title: experience.experienceOrg.name,
        url: mdxUrl(`${ROUTES.EXPERIENCES}/${experience.slug}`),
      })),
    ],
    title: "Experiences",
  },
];

export const formatLlmsSection = (section: LlmsSection): string => {
  const lines = section.links.map((link) => {
    const note = link.description ? `: ${link.description}` : "";
    return `- [${link.title}](${link.url})${note}`;
  });
  return `## ${section.title}\n\n${lines.join("\n")}`;
};

export const getLlmsHeader = (): string => `# ${SITE.NAME}

> ${SITE.DESCRIPTION.SHORT}

${SITE.DESCRIPTION.LONG}

MDX endpoints (including \`<TechStack />\` and other components) use a \`.mdx\` URL rewritten to \`${ROUTES.LLMS_MDX}\`. Plain \`.md\` URLs redirect to \`.mdx\`.

`;
