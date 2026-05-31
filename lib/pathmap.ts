import type { PathItem } from "@/components/layout/navbar";

export const getPathMap = function getPathMap(): PathItem[] {
  return [
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
  ];
};
