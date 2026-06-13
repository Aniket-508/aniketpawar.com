"use client";

import { FileTextIcon, GlobeIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { trackExternalLinkClick } from "@/lib/events";
import type { ExperienceLinks } from "@/types/experiences";
import type { ProjectLinks } from "@/types/projects";

interface LinkItem {
  href: string;
  icon?: ReactNode;
  label: string;
  linkType: string;
}

interface TrackedProjectLinksProps {
  slug: string;
  title: string;
  links: ProjectLinks;
}

const TrackedProjectLinks = ({
  slug,
  title,
  links,
}: TrackedProjectLinksProps) => {
  const trackClick = (linkType: string, url: string) => {
    trackExternalLinkClick({
      context: "project_detail",
      link_type: linkType,
      slug,
      title,
      url,
    });
  };

  const linkItems: LinkItem[] = [];

  if (links.website) {
    linkItems.push({
      href: links.website,
      icon: <GlobeIcon />,
      label: "Website",
      linkType: "website",
    });
  }

  if (links.github) {
    linkItems.push({
      href: links.github,
      icon: <Icons.github />,
      label: "GitHub",
      linkType: "github",
    });
  }

  if (links.post) {
    linkItems.push({
      href: links.post,
      icon: <FileTextIcon />,
      label: "Post",
      linkType: "post",
    });
  }

  return (
    <div className="animate-slide-in delay-200 flex flex-wrap items-center gap-2">
      {linkItems.map(({ href, icon, label, linkType }) => (
        <Button
          key={linkType}
          variant="outline"
          size="sm"
          className="gap-1.5"
          nativeButton={false}
          render={
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onClick={() => trackClick(linkType, href)}
            />
          }
        >
          {icon}
          {label}
        </Button>
      ))}
    </div>
  );
};

interface TrackedExperienceLinksProps {
  slug: string;
  title: string;
  links: ExperienceLinks;
}

const TrackedExperienceLinks = ({
  slug,
  title,
  links,
}: TrackedExperienceLinksProps) => {
  const trackClick = (linkType: string, url: string) => {
    trackExternalLinkClick({
      context: "experience_detail",
      link_type: linkType,
      slug,
      title,
      url,
    });
  };

  const linkItems: LinkItem[] = [];

  if (links.website) {
    linkItems.push({
      href: links.website,
      icon: <GlobeIcon />,
      label: "Website",
      linkType: "website",
    });
  }

  if (links.linkedin) {
    linkItems.push({
      href: links.linkedin,
      icon: <Icons.linkedin />,
      label: "LinkedIn",
      linkType: "linkedin",
    });
  }

  if (links.x) {
    linkItems.push({
      href: links.x,
      icon: <Icons.x />,
      label: "X",
      linkType: "x",
    });
  }

  if (links.github) {
    linkItems.push({
      href: links.github,
      icon: <Icons.github />,
      label: "GitHub",
      linkType: "github",
    });
  }

  return (
    <div className="animate-slide-in delay-100 flex flex-wrap items-center gap-2">
      {linkItems.map(({ href, icon, label, linkType }) => (
        <Button
          key={linkType}
          variant="outline"
          size="sm"
          className="gap-1.5"
          nativeButton={false}
          render={
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onClick={() => trackClick(linkType, href)}
            />
          }
        >
          {icon}
          {label}
        </Button>
      ))}
    </div>
  );
};

export { TrackedExperienceLinks, TrackedProjectLinks };
