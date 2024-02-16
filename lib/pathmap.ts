import { PathMapProps } from "@/components/layout/Navbar";

export const getPathMap = function (): PathMapProps[] {
  return [
    {
      pathType: "internal",
      title: "about",
      link: "/",
      isAvailable: true,
    },
    {
      pathType: "internal",
      title: "works",
      link: "/works",
      isAvailable: true,
    },
    {
      pathType: "internal",
      title: "projects",
      link: "/projects",
      isAvailable: true,
    },
    {
      pathType: "internal",
      title: "socials",
      link: "/socials",
      isAvailable: true,
    },
    {
      pathType: "internal",
      title: "resume",
      link: "/resume.pdf",
      isAvailable: true,
    },
  ];
};
