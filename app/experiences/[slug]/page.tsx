import { ArrowLeftIcon, GlobeIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { MdxBody } from "@/components/mdx-body";
import { ProjectShareButton } from "@/components/project-share-button";
import { TOCMinimap } from "@/components/toc-minimap";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getExperienceMdxEntry } from "@/lib/content/experiences";
import { tocFromMdast } from "@/lib/content/toc";
import { getExperienceBySlug, getExperienceSlugs } from "@/lib/experiences";
import { getTechLink } from "@/lib/tech";

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
  const pageUrl = `${SITE.URL}${ROUTES.EXPERIENCES}/${experience.slug}`;
  const shareTitle = `${experience.experienceTitle} · ${experience.experienceOrg.name}`;

  return (
    <Container className="pt-20 pb-14">
      <TOCMinimap items={tocItems} />

      <article className="px-4 space-y-8 pb-16">
        <div className="flex items-center justify-between gap-4">
          <Button variant="ghost" size="sm" className="-ml-2 gap-1.5" asChild>
            <Link href={ROUTES.EXPERIENCES}>
              <ArrowLeftIcon className="size-4" />
              Experience
            </Link>
          </Button>
          <ProjectShareButton title={shareTitle} url={pageUrl} />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-md border border-border px-2 py-0.5 text-xs">
            Experience
          </span>
          <span aria-hidden>·</span>
          <time>
            {experience.experienceStatus.startAt} –{" "}
            {experience.experienceStatus.endAt}
          </time>
        </div>

        <header className="space-y-4">
          <h1 className="text-3xl font-normal tracking-tight text-primary">
            {experience.experienceTitle}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {experience.experienceOrg.name} ·{" "}
            {experience.experienceOrg.websiteDisplayName}
          </p>
        </header>

        <Button variant="outline" size="sm" className="gap-1.5" asChild>
          <a
            href={experience.experienceOrg.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlobeIcon className="size-4" />
            Website
          </a>
        </Button>

        <MdxBody Content={Content} />

        {experience.experienceTech.length > 0 && (
          <section id="technologies" className="scroll-mt-24 not-prose">
            <h2 className="mb-4 text-xl font-normal text-primary">
              Technologies
            </h2>
            <div className="flex flex-wrap gap-1">
              {experience.experienceTech.map((tech, index) => {
                const techUrl = getTechLink(tech);

                return (
                  <div key={tech} className="flex items-center gap-1">
                    {techUrl ? (
                      <a href={techUrl} target="_blank" rel="noreferrer">
                        <Tag className="cursor-pointer font-mono">{tech}</Tag>
                      </a>
                    ) : (
                      <Tag className="font-mono">{tech}</Tag>
                    )}
                    <span className="text-xs text-secondary-foreground opacity-70">
                      {index !== experience.experienceTech.length - 1 && "/"}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </Container>
  );
};

export default ExperiencePage;
