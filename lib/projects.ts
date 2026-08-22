import {
  HOME_FEATURED_PROJECT_COUNT,
  PROJECTS,
  PROJECT_SOURCES,
} from "@/constants/projects";
import type {
  Project,
  ProjectSource,
  ProjectSourceOption,
} from "@/types/projects";

export const getProjects = (): readonly Project[] => PROJECTS;

export const filterProjectsBySource = (
  projects: readonly Project[],
  source: ProjectSource
): readonly Project[] =>
  projects.filter((project) => project.source === source);

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

export const getProjectSourceOption = (
  source: ProjectSource
): ProjectSourceOption =>
  PROJECT_SOURCES.find((option) => option.value === source) ??
  PROJECT_SOURCES[0];
