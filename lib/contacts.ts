import type { ContactItemProps } from "@/components/contact-section";
import { Icons } from "@/components/icons";
import { LINK } from "@/constants/links";

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
        url: LINK.LINKEDIN,
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
        url: LINK.TOPMATE,
      },
      title: "Topmate",
    },
    {
      icon: Icons.peerlist,
      link: {
        display: "@aniket_pawar",
        url: LINK.PEERLIST,
      },
      title: "Peerlist",
    },
  ];
};
