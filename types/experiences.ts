export type ExperienceCategory = "FinTech" | "HRTech";

export interface ExperienceOrg {
  name: string;
  link: string;
  websiteDisplayName: string;
}

export interface ExperienceStatus {
  startAt: string;
  endAt: string;
}

export interface ExperienceLinks {
  website?: string;
  linkedin?: string;
  x?: string;
  github?: string;
}

export interface Experience {
  slug: string;
  experienceTitle: string;
  experienceDescription: string[];
  category: ExperienceCategory;
  orgDescription: string;
  experienceOrg: ExperienceOrg;
  experienceStatus: ExperienceStatus;
  experienceLinks: ExperienceLinks;
  experienceTech: string[];
}
