import type { Craft } from "@/types/crafts";

import { ASSETS } from "./links";

export const CRAFTS = [
  {
    category: "Motion",
    description:
      "Enter/exit animations using Motion for CRUD operations in a dialog.",
    links: {
      preview: ASSETS.CRUD_DIALOG_ANIMATION,
    },
    slug: "crud-dialog",
    title: "CRUD Dialog",
  },
  {
    category: "CSS",
    description:
      "Envelope opening animation using CSS animations for founder's letter.",
    links: {
      preview: ASSETS.FOUNDER_LETTER_ANIMATION,
    },
    slug: "founders-letter",
    title: "Founder's Letter",
  },
] as const satisfies readonly Craft[];
