import { projects as projectsMdx } from "content/projects";

type ProjectMdxEntry = ReturnType<typeof projectsMdx.list>[number];

export const getProjectMdxEntry = (slug: string): ProjectMdxEntry | undefined =>
  projectsMdx.list().find((entry) => entry.compiled.frontmatter.slug === slug);

export const getProjectMdxSlugs = (): string[] =>
  projectsMdx.list().map((entry) => entry.compiled.frontmatter.slug);
