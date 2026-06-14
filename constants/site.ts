import type { NavItem } from "@/types/nav";

import { ROUTES } from "./routes";

export const FALLBACK_SITE_ORIGIN = "https://www.aniketpawar.com" as const;

const getBaseUrl = () => {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return process.env.SITE_URL ?? FALLBACK_SITE_ORIGIN;
};

const baseUrl = getBaseUrl();

export const SITE = {
  AUTHOR: {
    AVATAR:
      "https://ik.imagekit.io/2oajjadqkz/profile.jpg?updatedAt=1770631384305",
    NAME: "Aniket Pawar",
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
  NAME: "Aniket Pawar",
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
