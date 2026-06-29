import { ROUTES } from "@/constants/routes";
import type { SectionId } from "@/types/nav";

export const getActiveSection = (pathname: string): SectionId | null => {
  if (pathname === ROUTES.HOME) {
    return "home";
  }

  if (
    pathname === ROUTES.PROJECTS ||
    pathname.startsWith(`${ROUTES.PROJECTS}/`)
  ) {
    return "projects";
  }

  if (pathname === ROUTES.CRAFTS || pathname.startsWith(`${ROUTES.CRAFTS}/`)) {
    return "crafts";
  }

  if (
    pathname === ROUTES.EXPERIENCES ||
    pathname.startsWith(`${ROUTES.EXPERIENCES}/`)
  ) {
    return "experiences";
  }

  if (pathname === ROUTES.STACK || pathname.startsWith(`${ROUTES.STACK}/`)) {
    return "stack";
  }

  if (
    pathname === ROUTES.FAVORITES ||
    pathname.startsWith(`${ROUTES.FAVORITES}/`)
  ) {
    return "favorites";
  }

  return null;
};
