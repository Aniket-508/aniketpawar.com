import { LINK } from "@/constants/links";
import type { Contact } from "@/types/contacts";

export const CONTACTS = [
  {
    icon: "github",
    link: {
      display: "@Aniket-508",
      url: LINK.GITHUB,
    },
    title: "GitHub",
  },
  {
    icon: "linkedin",
    link: {
      display: "@aniketpawar508",
      url: LINK.LINKEDIN,
    },
    title: "LinkedIn",
  },
  {
    icon: "x",
    link: {
      display: "@alaymanguy",
      url: LINK.TWITTER,
    },
    title: "Twitter",
  },
  {
    icon: "topmate",
    link: {
      display: "@aniket_pawar",
      url: LINK.TOPMATE,
    },
    title: "Topmate",
  },
  {
    icon: "peerlist",
    link: {
      display: "@aniket_pawar",
      url: LINK.PEERLIST,
    },
    title: "Peerlist",
  },
  {
    icon: "discord",
    link: {
      display: "@aniketpawar",
      url: LINK.DISCORD,
    },
    title: "Discord",
  },
  {
    icon: "telegram",
    link: {
      display: "@Aniket_508",
      url: LINK.TELEGRAM,
    },
    title: "Telegram",
  },
] as const satisfies readonly Contact[];
