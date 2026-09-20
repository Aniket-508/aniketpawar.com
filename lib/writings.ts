import { WRITINGS } from "@/constants/writing";
import type { Writing } from "@/types/writing";

export const getWritings = (): readonly Writing[] => WRITINGS;

export const getWritingBySlug = (slug: string): Writing | undefined =>
  WRITINGS.find((writing) => writing.slug === slug);

export const getWritingSlugs = (): string[] =>
  WRITINGS.map((writing) => writing.slug);

export const formatWritingDate = (date: Writing["date"]): string =>
  `${date.month} ${date.year}`;
