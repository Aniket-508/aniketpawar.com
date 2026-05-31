import type { CraftItemProps } from "@/components/craft-item";

export const getCrafts = function getCrafts(): CraftItemProps[] {
  return [
    {
      description:
        "Enter/exit animations using Motion for CRUD operations in a dialog.",
      links: {
        preview:
          "https://yffrvzi8zwbljfuj.public.blob.vercel-storage.com/portfolio-website/crud_dialog_animation.mp4",
      },
      title: "CRUD Dialog",
    },
    {
      description:
        "Envelope opening animation using CSS animations for founder's letter.",
      links: {
        preview:
          "https://yffrvzi8zwbljfuj.public.blob.vercel-storage.com/portfolio-website/founder_letter_animation.mp4",
      },
      title: "Founder's Letter",
    },
  ];
};
