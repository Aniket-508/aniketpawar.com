import { CRAFTS } from "@/constants/crafts";
import type { Craft } from "@/types/crafts";

export const getCrafts = (): readonly Craft[] => CRAFTS;

export const getCraftBySlug = (slug: string): Craft | undefined =>
  CRAFTS.find((craft) => craft.slug === slug);

export const getCraftSlugs = (): string[] => CRAFTS.map((craft) => craft.slug);
