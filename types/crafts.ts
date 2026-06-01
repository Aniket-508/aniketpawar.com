export type CraftCategory = "Motion" | "CSS";

export interface CraftLinks {
  preview: string;
}

export interface Craft {
  slug: string;
  title: string;
  description: string;
  category: CraftCategory;
  links: CraftLinks;
}
