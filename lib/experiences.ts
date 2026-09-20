import {
  EXPERIENCES,
  HOMEPAGE_EXPERIENCE_COUNT,
} from "@/constants/experiences";
import type { Experience } from "@/types/experiences";

export const getExperiences = (): readonly Experience[] => EXPERIENCES;

export const getExperienceBySlug = (slug: string): Experience | undefined =>
  EXPERIENCES.find((experience) => experience.slug === slug);

export const getExperienceSlugs = (): string[] =>
  EXPERIENCES.map((experience) => experience.slug);

export const getHomepageExperiences = (): readonly Experience[] =>
  EXPERIENCES.slice(0, HOMEPAGE_EXPERIENCE_COUNT);
