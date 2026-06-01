import type { PathItem } from "@/types/navigation";

export const PATH_MAP = [
  {
    isAvailable: true,
    link: "/",
    pathType: "internal",
    title: "about",
  },
  {
    isAvailable: true,
    link: "/works",
    pathType: "internal",
    title: "works",
  },
  {
    isAvailable: true,
    link: "/projects",
    pathType: "internal",
    title: "projects",
  },
  {
    isAvailable: true,
    link: "/socials",
    pathType: "internal",
    title: "socials",
  },
  {
    isAvailable: true,
    link: "/resume.pdf",
    pathType: "internal",
    title: "resume",
  },
] as const satisfies readonly PathItem[];
