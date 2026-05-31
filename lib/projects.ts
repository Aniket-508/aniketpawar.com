import type { ProjectItemProps } from "@/components/main/project-section";

export const getProjects = function getProjects(): ProjectItemProps[] {
  const projects: ProjectItemProps[] = [
    {
      category: ["ui/ux", "full-stack"],
      projectData: {
        liveURL: "https://www.peerlistpubli.sh/",
      },
      projectTitle: "Peerlist Publish",
      status: "Maintained",
    },
    {
      category: ["ui/ux", "icon-set"],
      projectData: {
        githubURL: "https://github.com/Aniket-508/heroicons-animated",
        liveURL: "https://heroicons-animated.com/",
      },
      projectTitle: "Animated Heroicons",
      status: "Open Source",
    },
    {
      category: ["ui/ux", "full-stack"],
      projectData: {
        githubURL: "https://github.com/Aniket-508/indian-quotes-api",
        liveURL: "https://indian-quotes-api.vercel.app/",
      },
      projectTitle: "Indian Quotes API",
      status: "Open Source",
    },
    {
      category: ["ui/ux", "full-stack"],
      projectData: {
        githubURL: "https://github.com/Aniket-508/instagram-posts-generator",
        liveURL: "https://instagram-posts-generator.vercel.app/",
      },
      projectTitle: "IG Posts Generator",
      status: "Open Source",
    },
  ];

  return projects;
};
