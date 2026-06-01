import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentTOC } from "@/components/content-toc";
import { MdxBody } from "@/components/mdx-body";
import { TrackedExperienceLinks } from "@/components/tracked-external-links";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { getExperienceMdxEntry } from "@/lib/content/experiences";
import { tocFromMdast } from "@/lib/content/toc";
import { getExperienceBySlug, getExperienceSlugs } from "@/lib/experiences";
import { BreadcrumbJsonLd, experiencesBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

interface ExperiencePageProps {
  params: Promise<{ slug: string }>;
}

const getExperienceHeading = (experience: {
  experienceTitle: string;
  experienceOrg: { name: string };
}) => `${experience.experienceTitle}, ${experience.experienceOrg.name}`;

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

  return createMetadata({
    canonical: `${ROUTES.EXPERIENCES}/${experience.slug}`,
    description: experience.orgDescription,
    title: getExperienceHeading(experience),
  });
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
  const heading = getExperienceHeading(experience);

  return (
    <>
      <BreadcrumbJsonLd
        items={experiencesBreadcrumbs({
          name: heading,
          path: `${ROUTES.EXPERIENCES}/${experience.slug}`,
        })}
      />

      <ContentTOC items={tocItems} />

      <article className="space-y-4 px-4 py-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-md border border-border px-2 py-0.5 text-xs">
            {experience.category}
          </span>
          <span aria-hidden>·</span>
          <time>
            {experience.experienceStatus.startAt} –{" "}
            {experience.experienceStatus.endAt}
          </time>
        </div>

        <header className="animate-slide-in space-y-2">
          <Title asChild>
            <h1>{heading}</h1>
          </Title>
          <p className="text-muted-foreground text-sm">
            {experience.orgDescription}
          </p>
        </header>

        <TrackedExperienceLinks
          slug={experience.slug}
          title={heading}
          links={experience.experienceLinks}
        />

        <MdxBody className="delay-200 mt-10" Content={Content} />
      </article>
    </>
  );
};

export default ExperiencePage;
