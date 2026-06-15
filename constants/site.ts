import type { NavItem } from "@/types/nav";

import { ROUTES } from "./routes";
import { getBaseUrl } from "./url";
import { NAME, USER } from "./user";

const baseUrl = getBaseUrl();

export const SITE = {
  AUTHOR: {
    AVATAR: USER.avatar,
    NAME,
    TWITTER: "@alaymanguy",
  },
  DESCRIPTION: {
    LONG: "Software Engineer & Product Builder crafting high-fidelity digital products that bridge design and tech. Explore my work and let's build something impactful today.",
    SHORT:
      "Crafting high-fidelity, design-led digital products with technical precision.",
  },
  KEYWORDS: [
    "Aniket Pawar",
    "Software Engineer",
    "Product Builder",
    "Frontend Engineer",
    "React Developer",
    "Next.js",
    "Tailwind CSS",
    "UI/UX Design",
    "Design Engineering",
    "Web Development",
    "Portfolio",
  ],
  NAME,
  OG_IMAGE:
    "https://ik.imagekit.io/2oajjadqkz/portfolio-image.png?updatedAt=1708090929752",
  URL: baseUrl,
} as const;

export const META_THEME_COLORS = {
  dark: "#0a0a0a",
  light: "#ffffff",
};

export const UTM_PARAMS = {
  utm_source: new URL(baseUrl).hostname,
};

export const NAV_ITEMS: NavItem[] = [
  {
    href: ROUTES.STACK,
    id: "stack",
    label: "stack",
  },
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
];
