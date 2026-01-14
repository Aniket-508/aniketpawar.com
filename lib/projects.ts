import { ProjectItemProps } from "@/components/main/ProjectSection"

export const getProjects = function (): ProjectItemProps[] {
  let projects: ProjectItemProps[] = [
    {
      projectTitle: "Peerlist Publish",
      projectData: {
        liveURL: "https://www.peerlistpubli.sh/",
      },
      category: ["ui/ux", "full-stack"],
      status: "Maintained",
    },
    {
      projectTitle: "Animated Heroicons",
      projectData: {
        githubURL: "https://github.com/Aniket-508/heroicons-animated",
        liveURL: "https://heroicons-animated.com/",
      },
      category: ["ui/ux", "icon-set"],
      status: "Open Source",
    },
    {
      projectTitle: "Indian Quotes API",
      projectData: {
        githubURL: "https://github.com/Aniket-508/indian-quotes-api",
        liveURL: "https://indian-quotes-api.vercel.app/",
      },
      category: ["ui/ux", "full-stack"],
      status: "Open Source",
    },
    {
      projectTitle: "IG Posts Generator",
      projectData: {
        githubURL: "https://github.com/Aniket-508/instagram-posts-generator",
        liveURL: "https://instagram-posts-generator.vercel.app/",
      },
      category: ["ui/ux", "full-stack"],
      status: "Open Source",
    },
  ]

  return projects
}
