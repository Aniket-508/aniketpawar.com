import type { ProjectItemProps } from "@/components/main/project-section";

export const getProjects = function getProjects(): ProjectItemProps[] {
  const projects: ProjectItemProps[] = [
    {
      category: ["ui/ux", "full-stack"],
      links: {
        website: "https://peerlistpublish.vercel.app",
      },
      status: "Maintained",
      title: "Peerlist Publish",
    },
    {
      category: ["ui/ux", "icon-set"],
      links: {
        github: "https://github.com/Aniket-508/heroicons-animated",
        website: "https://heroicons-animated.com/",
      },
      status: "Open Source",
      title: "Animated Heroicons",
    },
    {
      category: ["ui/ux", "full-stack"],
      links: {
        github: "https://github.com/Aniket-508/indian-quotes-api",
        website: "https://indian-quotes-api.vercel.app/",
      },
      status: "Open Source",
      title: "Indian Quotes API",
    },
    {
      category: ["ui/ux", "full-stack"],
      links: {
        github: "https://github.com/Aniket-508/instagram-posts-generator",
        website: "https://instagram-posts-generator.vercel.app/",
      },
      status: "Open Source",
      title: "IG Posts Generator",
    },
  ];

  return projects;
};
