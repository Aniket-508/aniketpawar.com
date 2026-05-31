import { Icons } from "@/components/icons";
import type { ContactItemProps } from "@/components/main/contact-section";
import { LINK } from "@/constants";

export const getContacts = function getContacts(): ContactItemProps[] {
  return [
    {
      icon: Icons.github,
      link: {
        display: "@Aniket-508",
        url: LINK.GITHUB,
      },
      title: "GitHub",
    },
    {
      icon: Icons.linkedin,
      link: {
        display: "@aniketpawar508",
        url: "https://linkedin.com/in/aniketpawar508/",
      },
      title: "LinkedIn",
    },
    {
      icon: Icons.x,
      link: {
        display: "@alaymanguy",
        url: LINK.TWITTER,
      },
      title: "Twitter",
    },
    {
      icon: Icons.topmate,
      link: {
        display: "@aniket_pawar",
        url: "https://topmate.io/aniket_pawar",
      },
      title: "Topmate",
    },
    {
      icon: Icons.peerlist,
      link: {
        display: "@aniket_pawar",
        url: "https://peerlist.io/aniket_pawar",
      },
      title: "Peerlist",
    },
  ];
};
