export type SectionId =
  | "blocks"
  | "blog"
  | "colophon"
  | "components"
  | "contact"
  | "crafts"
  | "experiences"
  | "favorites"
  | "home"
  | "projects"
  | "sponsor"
  | "stats"
  | "testimonials"
  | "uses"
  | "writing";

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
