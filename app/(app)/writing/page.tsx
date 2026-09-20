import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { getWritingMdxEntry } from "@/lib/content/writing";
import { formatWritingDate, getWritings } from "@/lib/writings";
import { BreadcrumbJsonLd, writingBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

const DESCRIPTION =
  "Thoughts on design, engineering, and building things that matter.";

export const metadata = createMetadata({
  canonical: ROUTES.WRITING,
  description: DESCRIPTION,
  title: "Writing",
});

const WritingPage = () => {
  const writings = getWritings();

  return (
    <>
      <BreadcrumbJsonLd items={writingBreadcrumbs()} />
      <header className="animate-slide-in space-y-2 px-4 py-6">
        <Title className="text-xl font-medium italic">{"writing."}</Title>
        <p className="text-muted-foreground text-sm">{DESCRIPTION}</p>
      </header>
      <Section className="delay-100 flex flex-col gap-6 py-2">
        {writings.map((writing) => {
          const mdxEntry = getWritingMdxEntry(writing.slug);
          const readingTime = mdxEntry?.compiled.readingTime as
            | number
            | undefined;

          return (
            <Link
              key={writing.slug}
              href={`${ROUTES.WRITING}/${writing.slug}`}
              className="group flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="text-muted-foreground">
                  {writing.category}
                </Badge>
                <span aria-hidden>·</span>
                <time dateTime={`${writing.date.year}-${writing.date.month}`}>
                  {formatWritingDate(writing.date)}
                </time>
                {readingTime && (
                  <>
                    <span aria-hidden>·</span>
                    <span>{readingTime} min read</span>
                  </>
                )}
              </div>
              <h2 className="font-sans text-base font-semibold group-hover:text-primary transition-colors">
                {writing.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {writing.description}
              </p>
            </Link>
          );
        })}
      </Section>
    </>
  );
};

export default WritingPage;
