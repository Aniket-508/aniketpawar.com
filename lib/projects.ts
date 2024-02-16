import { ProjectItemProps } from "@/components/main/ProjectSection";

export const getProjects = function (): ProjectItemProps[] {
  let projects: ProjectItemProps[] = [
    {
      projectTitle: "Patang Abhidani",
      projectData: {
        githubURL: "https://github.com/Aniket-508/PatangAbhidani",
      },
      description: [
        "First of a kind website for everything related to Skipper butterflies along with a pinch of integrated ML.",
      ],
      category: ["full-stack"],
    },
    {
      projectTitle: "Airbnb Clone",
      projectData: {
        githubURL: "https://github.com/Aniket-508/Airbnb-clone",
        liveURL: "http://airbnb-clone-sable-xi.vercel.app/",
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
      projectTitle: "Google Docs Clone",
      projectData: {
        githubURL: "https://github.com/Aniket-508/Google-Docs-Clone",
        liveURL: "https://google-docs-clone-aniket-508.vercel.app/",
      },
      category: ["ui/ux", "full-stack"],
    },
    {
      projectTitle: "LinkedIn Clone",
      projectData: {
        githubURL: "https://github.com/Aniket-508/LinkedIn-clone",
        liveURL: "https://linkedinclone-21c16.web.app/",
      },
      category: ["ui/ux", "full-stack"],
    },
  ];

  return projects;
};
