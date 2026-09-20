import type { Metadata } from "next";

import { RegistryDetail } from "@/components/registry/registry-detail";
import {
  getRegistryEntryBySlug,
  getRegistryEntrySlugs,
  REGISTRY_KINDS,
} from "@/lib/registry-items";
import { createMetadata } from "@/seo/metadata";

interface ComponentPageProps {
  params: Promise<{ slug: string }>;
}

const config = REGISTRY_KINDS.component;

export const generateStaticParams = () =>
  getRegistryEntrySlugs("component").map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: ComponentPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const entry = getRegistryEntryBySlug("component", slug);

  if (!entry) {
    return { title: "Component not found" };
  }

  return createMetadata({
    canonical: `${config.route}/${entry.slug}`,
    category: config.category,
    description: entry.description,
    title: entry.title,
  });
};

const ComponentPage = async ({ params }: ComponentPageProps) => {
  const { slug } = await params;

  return <RegistryDetail kind="component" slug={slug} />;
};

export default ComponentPage;
