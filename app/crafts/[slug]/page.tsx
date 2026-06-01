import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CraftDetailContent } from "@/components/craft-detail-content";
import { Container } from "@/components/layout/container";
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

  return (
    <Container className="pt-20 pb-14">
      <CraftDetailContent craft={craft} Content={Content} tocItems={tocItems} />
    </Container>
  );
};

export default CraftPage;
