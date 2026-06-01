import { experiences as experiencesMdx } from "content/experiences";

type ExperienceMdxEntry = ReturnType<typeof experiencesMdx.list>[number];

export const getExperienceMdxEntry = (
  slug: string
): ExperienceMdxEntry | undefined =>
  experiencesMdx
    .list()
    .find((entry) => entry.compiled.frontmatter.slug === slug);

export const getExperienceMdxSlugs = (): string[] =>
  experiencesMdx.list().map((entry) => entry.compiled.frontmatter.slug);
