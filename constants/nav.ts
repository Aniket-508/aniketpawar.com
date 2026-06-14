import { ROUTES } from "./routes";

export const NAV_ITEMS = [
  {
    href: ROUTES.PROJECTS,
    id: "projects",
    label: "projects",
  },
  {
    href: ROUTES.CRAFTS,
    id: "crafts",
    label: "crafts",
  },
  {
    href: ROUTES.EXPERIENCES,
    id: "experiences",
    label: "experience",
  },
  {
    href: ROUTES.STACK,
    id: "stack",
    label: "stack",
  },
] as const;

export type SectionId = (typeof NAV_ITEMS)[number]["id"];
