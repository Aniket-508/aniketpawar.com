import { ArrowLeftIcon, FileTextIcon, GlobeIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Icons } from "@/components/icons";
import { MdxBody } from "@/components/mdx-body";
import { ProjectShareButton } from "@/components/project-share-button";
import { TOCMinimap } from "@/components/toc-minimap";
import { Button } from "@/components/ui/button";
import { glimpse } from "@/components/ui/glimpse/server";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getProjectMdxEntry } from "@/lib/content/projects";
import { tocFromMdast } from "@/lib/content/toc";
import {
  formatProjectDate,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () =>
  getProjectSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    description: project.description,
    openGraph: {
      description: project.description,
      title: project.title,
      url: `${SITE.URL}${ROUTES.PROJECTS}/${project.slug}`,
    },
    title: `${project.title} · ${SITE.AUTHOR.NAME}`,
  };
};

const getPreviewImage = async (project: Project): Promise<string | null> => {
  if (project.image) {
    return project.image;
  }

  const url = project.links.website ?? project.links.github;
  if (!url) {
    return null;
  }

  const data = await glimpse(url);
  return data.image;
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const mdxEntry = getProjectMdxEntry(slug);

  if (!project || !mdxEntry) {
    notFound();
  }

  const { default: Content, _mdast } = mdxEntry.compiled;
  const tocItems = tocFromMdast(_mdast);
  const previewImage = await getPreviewImage(project);
  const imageSrc = project.image ?? previewImage ?? SITE.OG_IMAGE;
  const pageUrl = `${SITE.URL}${ROUTES.PROJECTS}/${project.slug}`;

  return (
    <>
      <TOCMinimap items={tocItems} />

      <article className="space-y-8 px-4 pb-16">
        <div className="flex items-center justify-between gap-4">
          <Button variant="ghost" size="sm" className="-ml-2 gap-1.5" asChild>
            <Link href={ROUTES.PROJECTS}>
              <ArrowLeftIcon className="size-4" />
              Projects
            </Link>
          </Button>
          <ProjectShareButton title={project.title} url={pageUrl} />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-md border border-border px-2 py-0.5 text-xs">
            {project.category}
          </span>
          <span aria-hidden>·</span>
          <time dateTime={`${project.date.year}-${project.date.month}`}>
            {formatProjectDate(project.date)}
          </time>
        </div>

        <header className="space-y-4">
          <h1 className="text-3xl font-normal tracking-tight text-primary">
            {project.title}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </header>

        <div className="relative aspect-1200/630 w-full overflow-hidden rounded-lg border border-border">
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 640px"
            priority
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {project.links.website && (
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <a
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon className="size-4" />
                Website
              </a>
            </Button>
          )}
          {project.links.github && (
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icons.github className="size-4" />
                GitHub
              </a>
            </Button>
          )}
          {project.links.post && (
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <a
                href={project.links.post}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileTextIcon className="size-4" />
                Post
              </a>
            </Button>
          )}
        </div>

        <MdxBody Content={Content} />

        {project.tech && project.tech.length > 0 && (
          <section id="technologies" className="scroll-mt-24 not-prose">
            <h2 className="mb-4 text-xl font-normal text-primary">
              Technologies
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground"
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
};

export default ProjectPage;
