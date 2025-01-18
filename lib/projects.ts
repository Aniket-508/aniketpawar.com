import { ProjectItemProps } from "@/components/main/ProjectSection";

export const getProjects = function (): ProjectItemProps[] {
  let projects: ProjectItemProps[] = [
    {
      projectTitle: "Indian Quotes API",
      projectData: {
        githubURL: "https://github.com/Aniket-508/indian-quotes-api",
        liveURL: "https://indian-quotes-api.vercel.app/",
      },
      category: ["ui/ux", "full-stack"],
    },
    {
      projectTitle: "Instagram Posts Generator",
      projectData: {
        githubURL: "https://github.com/Aniket-508/instagram-posts-generator",
        liveURL: "https://instagram-posts-generator.vercel.app/",
      },
      category: ["ui/ux"],
    },
    {
      projectTitle: "Typeform Clone",
      projectData: {
        githubURL: "https://github.com/Aniket-508/Typeform-Clone",
        liveURL: "https://typeform-clone-aniket-508.vercel.app/",
      },
      category: ["ui/ux"],
    },
    {
      projectTitle: "GitHub Business Card",
      projectData: {
        githubURL: "https://github.com/Aniket-508/github-business-card",
        liveURL: "https://gh-business-card.vercel.app/",
      },
      category: ["ui/ux"],
    },
  ];

  return projects;
};
