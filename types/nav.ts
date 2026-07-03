export type SectionId =
  | "contact"
  | "crafts"
  | "experiences"
  | "favorites"
  | "guestbook"
  | "home"
  | "projects"
  | "stack";

export interface NavItem {
  href: string;
  id: SectionId;
  label: string;
}
