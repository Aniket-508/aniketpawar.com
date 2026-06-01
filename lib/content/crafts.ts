import { crafts as craftsMdx } from "content/crafts";

type CraftMdxEntry = ReturnType<typeof craftsMdx.list>[number];

export const getCraftMdxEntry = (slug: string): CraftMdxEntry | undefined =>
  craftsMdx.list().find((entry) => entry.compiled.frontmatter.slug === slug);

export const getCraftMdxSlugs = (): string[] =>
  craftsMdx.list().map((entry) => entry.compiled.frontmatter.slug);
