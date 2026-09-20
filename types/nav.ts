export type SectionId =
  | "blocks"
  | "components"
  | "contact"
  | "crafts"
  | "experiences"
  | "favorites"
  | "home"
  | "projects"
  | "uses"
  | "stats";

export type NavGroupId = "extras" | "ui" | "work";

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
