import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type MdxCollection = "projects" | "crafts" | "experiences";

const CONTENT_DIR = join(process.cwd(), "content");

const splitFrontmatter = (
  raw: string
): { frontmatter: string; body: string } => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/u.exec(raw);
  if (!match) {
    return { body: raw.trim(), frontmatter: "" };
  }
  return { body: match[2].trim(), frontmatter: match[1].trim() };
};

export const readMdxSource = async (
  collection: MdxCollection,
  slug: string
): Promise<string | null> => {
  const filePath = join(CONTENT_DIR, collection, `${slug}.mdx`);
  try {
    return await readFile(filePath, "utf-8");
  } catch {
    return null;
  }
};

interface FormatMdxDocumentOptions {
  collection: MdxCollection;
  description: string;
  path: string;
  slug: string;
  title: string;
}

export const formatMdxDocument = async ({
  collection,
  description,
  path,
  slug,
  title,
}: FormatMdxDocumentOptions): Promise<string | null> => {
  const raw = await readMdxSource(collection, slug);
  if (!raw) {
    return null;
  }

  const { frontmatter, body } = splitFrontmatter(raw);
  const mergedFrontmatter = [
    `title: ${title}`,
    `description: ${description}`,
    `collection: ${collection}`,
    `path: ${path}`,
    frontmatter.includes("slug:") ? "" : `slug: ${slug}`,
    frontmatter,
  ]
    .filter(Boolean)
    .join("\n");

  return `---\n${mergedFrontmatter}\n---\n\n${body}`;
};
