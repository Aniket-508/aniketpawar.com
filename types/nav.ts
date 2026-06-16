export type SectionId = "crafts" | "experiences" | "projects" | "stack";

export interface NavItem {
  href: string;
  id: SectionId;
  label: string;
}
