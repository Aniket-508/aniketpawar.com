import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MdxBody } from "@/components/mdx-body";
import { TOCMinimap } from "@/components/toc-minimap";
import { ROUTES } from "@/constants/routes";
import { getCraftMdxEntry } from "@/lib/content/crafts";
import { tocFromMdast } from "@/lib/content/toc";
import { getCraftBySlug, getCraftSlugs } from "@/lib/crafts";
import { BreadcrumbJsonLd, craftsBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

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

  return createMetadata({
    canonical: `${ROUTES.CRAFTS}/${craft.slug}`,
    description: craft.description,
    title: craft.title,
  });
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

  return (
    <>
      <BreadcrumbJsonLd
        items={craftsBreadcrumbs({
          name: craft.title,
          path: `${ROUTES.CRAFTS}/${craft.slug}`,
        })}
      />
      <TOCMinimap items={tocItems} />

      <article className="px-4 space-y-8 pb-16">
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

        <MdxBody Content={Content} />
      </article>
    </>
  );
};

export default CraftPage;
