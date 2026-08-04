export type SectionId =
  | "contact"
  | "crafts"
  | "experiences"
  | "favorites"
  | "home"
  | "projects"
  | "stack"
  | "stats"
  | "ui";

export type NavGroupId = "extras" | "work";

export interface NavItem {
  href: string;
  id: SectionId;
  label: string;
}

export interface NavGroup {
  id: NavGroupId;
  label: string;
  items: NavItem[];
}
