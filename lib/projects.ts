import { HOME_FEATURED_PROJECT_COUNT, PROJECTS } from "@/constants/projects";
import type { Project } from "@/types/projects";

export const getProjects = (): readonly Project[] => PROJECTS;

export const getFeaturedProjects = (
  limit = HOME_FEATURED_PROJECT_COUNT
): Project[] => PROJECTS.filter((p) => p.featured).slice(0, limit);

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);

export const getProjectSlugs = (): string[] => PROJECTS.map((p) => p.slug);

export const formatProjectDate = (date: Project["date"]): string =>
  `${date.month} ${date.year}`;

export const collectProjectUrls = (
  projectList: readonly Project[]
): string[] => {
  const urls: string[] = [];

  for (const project of projectList) {
    if (project.links.website) {
      urls.push(project.links.website);
    }
    if (project.links.github) {
      urls.push(project.links.github);
    }
  }

  return urls;
};
