export type SectionId =
  | "contact"
  | "crafts"
  | "experiences"
  | "favorites"
  | "home"
  | "projects"
  | "stack";

export interface NavItem {
  href: string;
  id: SectionId;
  label: string;
}
