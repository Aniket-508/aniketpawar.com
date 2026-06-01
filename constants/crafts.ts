import type { Craft } from "@/types/crafts";

export const CRAFTS = [
  {
    description:
      "Enter/exit animations using Motion for CRUD operations in a dialog.",
    links: {
      preview:
        "https://yffrvzi8zwbljfuj.public.blob.vercel-storage.com/portfolio-website/crud_dialog_animation.mp4",
    },
    slug: "crud-dialog",
    title: "CRUD Dialog",
  },
  {
    description:
      "Envelope opening animation using CSS animations for founder's letter.",
    links: {
      preview:
        "https://yffrvzi8zwbljfuj.public.blob.vercel-storage.com/portfolio-website/founder_letter_animation.mp4",
    },
    slug: "founders-letter",
    title: "Founder's Letter",
  },
] as const satisfies readonly Craft[];
