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
    LONG: "Frontend engineer based in Mumbai, India. I care deeply about visual craft and obsess over building products that feel fast, polished, and human. I run Shadcn Labs, an open-source org pushing the limits of the shadcn/ui ecosystem.",
    SHORT:
      "Frontend engineer obsessed with visual craft and building fast, polished, human-centric products.",
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
    href: ROUTES.HOME,
    id: "home",
    label: "home",
  },
  {
    group: "work",
    href: ROUTES.STACK,
    id: "stack",
    label: "stack",
  },
  {
    group: "work",
    href: ROUTES.PROJECTS,
    id: "projects",
    label: "projects",
  },
  {
    group: "work",
    href: ROUTES.CRAFTS,
    id: "crafts",
    label: "crafts",
  },
  {
    group: "work",
    href: ROUTES.EXPERIENCES,
    id: "experiences",
    label: "experience",
  },
  // {
  //   group: "work",
  //   href: ROUTES.BLOG,
  //   id: "blog",
  //   label: "blog",
  // },
  // {
  //   group: "ui",
  //   href: ROUTES.COMPONENTS,
  //   id: "components",
  //   label: "components",
  // },
  // {
  //   group: "ui",
  //   href: ROUTES.BLOCKS,
  //   id: "blocks",
  //   label: "blocks",
  // },
  {
    group: "extras",
    href: ROUTES.FAVORITES,
    id: "favorites",
    label: "favorites",
  },
  {
    group: "extras",
    href: ROUTES.STATS,
    id: "stats",
    label: "stats",
  },
  // {
  //   group: "extras",
  //   href: ROUTES.SPONSORS,
  //   id: "sponsor",
  //   label: "sponsor",
  // },
  {
    href: ROUTES.CONTACT,
    id: "contact",
    label: "contact",
  },
];
