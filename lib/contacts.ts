import { LINK } from "@/constants"

import { Icons } from "@/components/Icons"
import { ContactItemProps } from "@/components/main/ContactSection"

export const getContacts = function (): ContactItemProps[] {
  return [
    {
      title: "GitHub",
      icon: Icons.github,
      link: {
        display: "@Aniket-508",
        url: LINK.GITHUB,
      },
    },
    {
      title: "LinkedIn",
      icon: Icons.linkedin,
      link: {
        display: "@aniketpawar508",
        url: "https://linkedin.com/in/aniketpawar508/",
      },
    },
    {
      title: "Twitter",
      icon: Icons.x,
      link: {
        display: "@alaymanguy",
        url: LINK.TWITTER,
      },
    },
    {
      title: "Topmate",
      icon: Icons.topmate,
      link: {
        display: "@aniket_pawar",
        url: "https://topmate.io/aniket_pawar",
      },
    },
    {
      title: "Peerlist",
      icon: Icons.peerlist,
      link: {
        display: "@aniket_pawar",
        url: "https://peerlist.io/aniket_pawar",
      },
    },
  ]
}
