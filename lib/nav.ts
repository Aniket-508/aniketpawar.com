import { ROUTES } from "@/constants/routes";
import { NAV_STANDALONE } from "@/constants/site";
import type { NavItem, SectionId } from "@/types/nav";

const SECTION_ROUTES: { id: SectionId; route: string }[] = [
  { id: "contact", route: ROUTES.CONTACT },
  { id: "projects", route: ROUTES.PROJECTS },
  { id: "crafts", route: ROUTES.CRAFTS },
  { id: "experiences", route: ROUTES.EXPERIENCES },
  { id: "favorites", route: ROUTES.FAVORITES },
  { id: "stats", route: ROUTES.STATS },
  { id: "uses", route: ROUTES.USES },
];

export const isNavGroupActive = (
  items: NavItem[],
  activeSection: SectionId | null
): boolean => items.some((item) => item.id === activeSection);

export const getActiveSection = (pathname: string): SectionId | null => {
  if (pathname === ROUTES.HOME) {
    return "home";
  }

  for (const { id, route } of SECTION_ROUTES) {
    if (pathname === route || pathname.startsWith(`${route}/`)) {
      return id;
    }
  }

  return null;
};

export const getHomeNavItem = (): NavItem =>
  NAV_STANDALONE.find((item) => item.id === "home") ?? {
    href: ROUTES.HOME,
    id: "home",
    label: "home",
  };
