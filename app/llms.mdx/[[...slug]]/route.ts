import { notFound } from "next/navigation";

import { markdownResponse } from "@/lib/llms/api";
import {
  getLLMText,
  getLlmsPage,
  getLlmsPages,
  getPageMdxSegments,
} from "@/lib/llms/source";

export const dynamic = "force-static";
export const revalidate = false;

const llmsMdx = async (
  context: { params: Promise<{ slug?: string[] }> },
  includeBody: boolean
) => {
  const { slug } = await context.params;

  if (!slug?.length || slug.at(-1) !== "content.mdx") {
    notFound();
  }

  const page = getLlmsPage(slug.slice(0, -1));
  if (!page) {
    notFound();
  }

  const text = await getLLMText(page);
  if (!text) {
    notFound();
  }

  return markdownResponse(text, includeBody);
};

export const GET = (
  _request: Request,
  context: { params: Promise<{ slug?: string[] }> }
) => llmsMdx(context, true);

export const HEAD = (
  _request: Request,
  context: { params: Promise<{ slug?: string[] }> }
) => llmsMdx(context, false);

export const generateStaticParams = () =>
  getLlmsPages().map((page) => ({
    slug: getPageMdxSegments(page),
  }));
