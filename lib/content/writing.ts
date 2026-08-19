import { writing as writingMdx } from "content/writing";

type WritingMdxEntry = ReturnType<typeof writingMdx.list>[number];

export const getWritingMdxEntry = (slug: string): WritingMdxEntry | undefined =>
  writingMdx.list().find((entry) => entry.compiled.frontmatter.slug === slug);

export const getWritingMdxSlugs = (): string[] =>
  writingMdx.list().map((entry) => entry.compiled.frontmatter.slug);
