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
  group?: NavGroupId;
  href: string;
  id: SectionId;
  label: string;
}

export type NavDropdownSection =
  | { item: NavItem; type: "item" }
  | { group: NavGroupId; items: NavItem[]; type: "group" };
