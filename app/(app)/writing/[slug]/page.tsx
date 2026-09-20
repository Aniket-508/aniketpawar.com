import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentTOC } from "@/components/content-toc";
import { MdxBody } from "@/components/mdx-body";
import { Badge } from "@/components/ui/badge";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { tocFromMdast } from "@/lib/content/toc";
import { getWritingMdxEntry } from "@/lib/content/writing";
import {
  formatWritingDate,
  getWritingBySlug,
  getWritingSlugs,
} from "@/lib/writings";
import { BreadcrumbJsonLd, writingBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

interface WritingPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  getWritingSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: WritingPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const writing = getWritingBySlug(slug);

  if (!writing) {
    return { title: "Writing not found" };
  }

  return createMetadata({
    canonical: `${ROUTES.WRITING}/${writing.slug}`,
    description: writing.description,
    title: writing.title,
  });
};

const WritingPage = async ({ params }: WritingPageProps) => {
  const { slug } = await params;
  const writing = getWritingBySlug(slug);
  const mdxEntry = getWritingMdxEntry(slug);

  if (!writing || !mdxEntry) {
    notFound();
  }

  const { default: Content, _mdast, readingTime } = mdxEntry.compiled;
  const tocItems = tocFromMdast(_mdast);
  const minutes = readingTime as number | undefined;

  return (
    <>
      <BreadcrumbJsonLd
        items={writingBreadcrumbs({
          name: writing.title,
          path: `${ROUTES.WRITING}/${writing.slug}`,
        })}
      />

      <ContentTOC items={tocItems} />

      <article className="px-4 py-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className="text-muted-foreground">
            {writing.category}
          </Badge>
          <span aria-hidden>·</span>
          <time dateTime={`${writing.date.year}-${writing.date.month}`}>
            {formatWritingDate(writing.date)}
          </time>
          {minutes && (
            <>
              <span aria-hidden>·</span>
              <span>{minutes} min read</span>
            </>
          )}
        </div>

        <header className="animate-slide-in space-y-2">
          <Title className="font-sans">{writing.title}</Title>
          <p className="text-muted-foreground text-sm">{writing.description}</p>
        </header>

        <MdxBody className="delay-200 mt-10" Content={Content} />
      </article>
    </>
  );
};

export default WritingPage;
