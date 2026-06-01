import { TECH_LINKS } from "@/constants/tech-links";

export type TechLinkKey = keyof typeof TECH_LINKS;

export const getTechLink = (tech: string): string | undefined =>
  TECH_LINKS[tech as TechLinkKey];

export { TECH_LINKS };
