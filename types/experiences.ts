export interface ExperienceOrg {
  name: string;
  link: string;
  websiteDisplayName: string;
}

export interface ExperienceStatus {
  startAt: string;
  endAt: string;
}

export interface Experience {
  slug: string;
  experienceTitle: string;
  experienceDescription: string[];
  experienceOrg: ExperienceOrg;
  experienceStatus: ExperienceStatus;
  experienceTech: string[];
}
