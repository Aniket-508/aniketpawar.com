export type ProjectCategory =
  | "Open Source"
  | "Tool"
  | "API"
  | "Product"
  | "Boilerplate";

export interface ProjectDate {
  month: string;
  year: number;
}

export interface ProjectLinks {
  website?: string;
  github?: string;
  post?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  date: ProjectDate;
  featured?: boolean;
  links: ProjectLinks;
  image?: string;
  tech?: string[];
}

export interface TOCItem {
  title: string;
  url: string;
  depth: number;
}
