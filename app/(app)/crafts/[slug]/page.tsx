import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentTOC } from "@/components/content-toc";
import { MdxBody } from "@/components/mdx-body";
import { MediaPreview } from "@/components/media-preview";
import { Badge } from "@/components/ui/badge";
import { Title } from "@/components/ui/title";
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

      <ContentTOC items={tocItems} />

      <article className="space-y-4 px-4 py-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className="text-muted-foreground">
            {craft.category}
          </Badge>
        </div>

        <header className="animate-slide-in space-y-2">
          <Title asChild>
            <h1>{craft.title}</h1>
          </Title>
          <p className="text-muted-foreground text-sm">{craft.description}</p>
        </header>

        <MediaPreview
          src={craft.links.preview}
          title={craft.title}
          className="animate-slide-in delay-100"
          type="video"
        />

        <MdxBody className="delay-200 mt-10" Content={Content} />
      </article>
    </>
  );
};

export default CraftPage;
