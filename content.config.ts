import rehypeShiki from "@shikijs/rehype";
import { mdxCollection } from "fuma-content/collections/mdx";
import { defineConfig } from "fuma-content/config";
import remarkGfm from "remark-gfm";
import remarkHeadingId from "remark-heading-id";
import { z } from "zod";

const slugFrontmatter = z.object({
  slug: z.string(),
});

const mdxOptions = () => ({
  rehypePlugins: [[rehypeShiki, { theme: "github-dark" }]],
  remarkPlugins: [remarkGfm, [remarkHeadingId, { defaults: true }]],
});

const projects = mdxCollection({
  dir: "content/projects",
  frontmatter: slugFrontmatter,
  // @ts-expect-error — remark-heading-id plugin tuple typing
  options: mdxOptions,
  postprocess: {
    mdast: true,
  },
});

const crafts = mdxCollection({
  dir: "content/crafts",
  frontmatter: slugFrontmatter,
  // @ts-expect-error — remark-heading-id plugin tuple typing
  options: mdxOptions,
  postprocess: {
    mdast: true,
  },
});

const experiences = mdxCollection({
  dir: "content/experiences",
  frontmatter: slugFrontmatter,
  // @ts-expect-error — remark-heading-id plugin tuple typing
  options: mdxOptions,
  postprocess: {
    mdast: true,
  },
});

export default defineConfig({
  collections: { crafts, experiences, projects },
});
