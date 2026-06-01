import { EXPERIENCES } from "@/constants/experiences";
import type { Experience } from "@/types/experiences";

export const getExperiences = (): readonly Experience[] => EXPERIENCES;

export const getExperienceBySlug = (slug: string): Experience | undefined =>
  EXPERIENCES.find((experience) => experience.slug === slug);

export const getExperienceSlugs = (): string[] =>
  EXPERIENCES.map((experience) => experience.slug);
