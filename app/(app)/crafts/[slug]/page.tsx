import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MdxBody } from "@/components/mdx-body";
import { ProjectShareButton } from "@/components/project-share-button";
import { TOCMinimap } from "@/components/toc-minimap";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getCraftMdxEntry } from "@/lib/content/crafts";
import { tocFromMdast } from "@/lib/content/toc";
import { getCraftBySlug, getCraftSlugs } from "@/lib/crafts";

interface CraftPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  getCraftSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: CraftPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const craft = getCraftBySlug(slug);

  if (!craft) {
    return { title: "Craft not found" };
  }

  return {
    description: craft.description,
    openGraph: {
      description: craft.description,
      title: craft.title,
      url: `${SITE.URL}${ROUTES.CRAFTS}/${craft.slug}`,
    },
    title: `${craft.title} · ${SITE.AUTHOR.NAME}`,
  };
};

const CraftPage = async ({ params }: CraftPageProps) => {
  const { slug } = await params;
  const craft = getCraftBySlug(slug);
  const mdxEntry = getCraftMdxEntry(slug);

  if (!craft || !mdxEntry) {
    notFound();
  }

  const { default: Content, _mdast } = mdxEntry.compiled;
  const tocItems = tocFromMdast(_mdast);
  const pageUrl = `${SITE.URL}${ROUTES.CRAFTS}/${craft.slug}`;

  return (
    <>
      <TOCMinimap items={tocItems} />

      <article className="px-4 space-y-8 pb-16">
        <div className="flex items-center justify-between gap-4">
          <Button variant="ghost" size="sm" className="-ml-2 gap-1.5" asChild>
            <Link href={ROUTES.CRAFTS}>
              <ArrowLeftIcon className="size-4" />
              Crafts
            </Link>
          </Button>
          <ProjectShareButton title={craft.title} url={pageUrl} />
        </div>

        <header className="space-y-4">
          <h1 className="text-3xl font-normal tracking-tight text-primary">
            {craft.title}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {craft.description}
          </p>
        </header>

        <div className="overflow-hidden rounded-lg border border-border">
          <video
            src={craft.links.preview}
            controls
            className="aspect-video w-full bg-muted"
            preload="metadata"
            aria-label={`${craft.title} preview`}
          >
            <track kind="captions" />
          </video>
        </div>

        <Button variant="outline" size="sm" className="gap-1.5" asChild>
          <a
            href={craft.links.preview}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLinkIcon className="size-4" />
            Preview
          </a>
        </Button>

        <MdxBody Content={Content} />
      </article>
    </>
  );
};

export default CraftPage;
