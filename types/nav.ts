export type SectionId =
  | "contact"
  | "crafts"
  | "experiences"
  | "favorites"
  | "home"
  | "projects"
  | "stack"
  | "stats";

export interface NavItem {
  href: string;
  id: SectionId;
  label: string;
}
