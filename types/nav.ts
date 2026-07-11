export type SectionId =
  | "blocks"
  | "blog"
  | "components"
  | "contact"
  | "crafts"
  | "experiences"
  | "favorites"
  | "home"
  | "projects"
  | "sponsor"
  | "stack"
  | "stats";

export type NavGroupId = "ui" | "extras" | "work";

export interface NavItem {
  group?: NavGroupId;
  href: string;
  id: SectionId;
  label: string;
}
