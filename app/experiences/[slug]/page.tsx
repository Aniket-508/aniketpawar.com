import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExperienceDetailContent } from "@/components/experience-detail-content";
import { Container } from "@/components/layout/container";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getExperienceMdxEntry } from "@/lib/content/experiences";
import { tocFromMdast } from "@/lib/content/toc";
import { getExperienceBySlug, getExperienceSlugs } from "@/lib/experiences";

interface ExperiencePageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  getExperienceSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: ExperiencePageProps): Promise<Metadata> => {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    return { title: "Experience not found" };
  }

  return {
    description: `${experience.experienceTitle} at ${experience.experienceOrg.name}`,
    openGraph: {
      description: `${experience.experienceTitle} at ${experience.experienceOrg.name}`,
      title: `${experience.experienceTitle} · ${experience.experienceOrg.name}`,
      url: `${SITE.URL}${ROUTES.EXPERIENCES}/${experience.slug}`,
    },
    title: `${experience.experienceTitle} · ${SITE.AUTHOR.NAME}`,
  };
};

const ExperiencePage = async ({ params }: ExperiencePageProps) => {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);
  const mdxEntry = getExperienceMdxEntry(slug);

  if (!experience || !mdxEntry) {
    notFound();
  }

  const { default: Content, _mdast } = mdxEntry.compiled;
  const tocItems = tocFromMdast(_mdast);

  return (
    <Container className="pt-20 pb-14">
      <ExperienceDetailContent
        experience={experience}
        Content={Content}
        tocItems={tocItems}
      />
    </Container>
  );
};

export default ExperiencePage;
