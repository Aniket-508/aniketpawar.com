import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentTOC } from "@/components/content-toc";
import { MdxBody } from "@/components/mdx-body";
import { TrackedProjectLinks } from "@/components/tracked-external-links";
import { Badge } from "@/components/ui/badge";
import { glimpse } from "@/components/ui/glimpse/server";
import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getProjectMdxEntry } from "@/lib/content/projects";
import { tocFromMdast } from "@/lib/content/toc";
import {
  formatProjectDate,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/projects";
import { BreadcrumbJsonLd, projectsBreadcrumbs } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";
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

  return createMetadata({
    canonical: `${ROUTES.PROJECTS}/${project.slug}`,
    description: project.description,
    title: project.title,
  });
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

  return (
    <>
      <BreadcrumbJsonLd
        items={projectsBreadcrumbs({
          name: project.title,
          path: `${ROUTES.PROJECTS}/${project.slug}`,
        })}
      />

      <ContentTOC items={tocItems} />

      <article className="px-4 py-6 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className="text-muted-foreground">
            {project.category}
          </Badge>
          <span aria-hidden>·</span>
          <time dateTime={`${project.date.year}-${project.date.month}`}>
            {formatProjectDate(project.date)}
          </time>
        </div>

        <header className="animate-slide-in space-y-2">
          <Title className="font-sans">{project.title}</Title>
          <p className="text-muted-foreground text-sm">{project.description}</p>
        </header>

        <div className="animate-slide-in delay-100 rounded-md border p-1">
          <div className="relative aspect-1200/630 w-full overflow-hidden rounded-sm border border-border select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <TrackedProjectLinks
          slug={project.slug}
          title={project.title}
          links={project.links}
        />

        <MdxBody className="delay-300 mt-10" Content={Content} />
      </article>
    </>
  );
};

export default ProjectPage;
