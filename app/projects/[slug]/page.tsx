import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { ProjectDetailContent } from "@/components/project-detail-content";
import { glimpse } from "@/components/ui/glimpse/server";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { getProjectMdxEntry } from "@/lib/content/projects";
import { tocFromMdast } from "@/lib/content/toc";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
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

  return (
    <Container className="pt-20 pb-14">
      <ProjectDetailContent
        project={project}
        previewImage={previewImage}
        Content={Content}
        tocItems={tocItems}
      />
    </Container>
  );
};

export default ProjectPage;
