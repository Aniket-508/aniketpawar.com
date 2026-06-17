export type SectionId =
  | "crafts"
  | "experiences"
  | "favorites"
  | "projects"
  | "stack";

export interface NavItem {
  href: string;
  id: SectionId;
  label: string;
}
