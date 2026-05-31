import type { ProjectItemProps } from "@/components/project-item";

export const getProjects = function getProjects(): ProjectItemProps[] {
  const projects: ProjectItemProps[] = [
    {
      description:
        "Publish your Peerlist article effortlessly to multiple platforms, including DEV.to, Hashnode, Medium, Ghost and more.",
      links: {
        website: "https://peerlistpublish.vercel.app",
      },
      title: "Peerlist Publish",
    },
    {
      description:
        "A collection of 316 beautifully animated Heroicons for React.",
      links: {
        github: "https://github.com/Aniket-508/heroicons-animated",
        website: "https://heroicons-animated.com/",
      },
      title: "heroicons-animated",
    },
    {
      description:
        "Free, open-source API delivering curated quotes from India's most successful entrepreneurs.",
      links: {
        github: "https://github.com/Aniket-508/indian-quotes-api",
        website: "https://indian-quotes-api.vercel.app/",
      },
      title: "Indian Quotes API",
    },
    {
      description:
        "Generate posts for your socials with templates from popular instagram pages with a few clicks.",
      links: {
        github: "https://github.com/Aniket-508/instagram-posts-generator",
        website: "https://instagram-posts-generator.vercel.app/",
      },
      title: "IG Posts Generator",
    },
  ];

  return projects;
};
