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
      projectTitle: "Typeform Clone",
      projectData: {
        githubURL: "https://github.com/Aniket-508/Typeform-Clone",
        liveURL: "https://typeform-clone-aniket-508.vercel.app/",
      },
      category: ["ui/ux"],
    },
    {
      projectTitle: "Airbnb Clone",
      projectData: {
        githubURL: "https://github.com/Aniket-508/Airbnb-clone",
        liveURL: "http://airbnb-clone-sable-xi.vercel.app/",
      },
      category: ["ui/ux"],
    },
  ];

  return projects;
};
