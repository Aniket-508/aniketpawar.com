import type { Metadata } from "next";

import { RegistryDetail } from "@/components/registry/registry-detail";
import {
  getRegistryEntryBySlug,
  getRegistryEntrySlugs,
  REGISTRY_KINDS,
} from "@/lib/registry-items";
import { createMetadata } from "@/seo/metadata";

interface BlockPageProps {
  params: Promise<{ slug: string }>;
}

const config = REGISTRY_KINDS.block;

export const generateStaticParams = () =>
  getRegistryEntrySlugs("block").map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: BlockPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const entry = getRegistryEntryBySlug("block", slug);

  if (!entry) {
    return { title: "Block not found" };
  }

  return createMetadata({
    canonical: `${config.route}/${entry.slug}`,
    category: config.category,
    description: entry.description,
    title: entry.title,
  });
};

const BlockPage = async ({ params }: BlockPageProps) => {
  const { slug } = await params;

  return <RegistryDetail kind="block" slug={slug} />;
};

export default BlockPage;
