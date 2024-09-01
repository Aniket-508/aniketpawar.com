import { ContactItemProps } from "@/components/main/ContactSection";

export const getContacts = function (): ContactItemProps[] {
  return [
    {
      title: "Topmate",
      icon: "topmate.svg",
      link: {
        display: "@aniket_pawar",
        url: "https://topmate.io/aniket_pawar",
      },
    },
    {
      title: "GitHub",
      icon: "github.svg",
      link: {
        display: "@Aniket-508",
        url: "https://github.com/Aniket-508",
      },
    },
    {
      title: "Twitter",
      icon: "twitter.svg",
      link: {
        display: "@alaymanguy",
        url: "https://twitter.com/alaymanguy",
      },
    },
    {
      title: "Peerlist",
      icon: "peerlist.svg",
      link: {
        display: "@aniket_pawar",
        url: "https://peerlist.io/aniket_pawar",
      },
    },
    {
      title: "LinkedIn",
      icon: "linkedin.svg",
      link: {
        display: "@aniket-pawar-4960911b8",
        url: "https://www.linkedin.com/in/aniket-pawar-4960911b8/",
      },
    },
  ];
};
