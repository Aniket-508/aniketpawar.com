"use client";

import { FileTextIcon, GlobeIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { trackExternalLinkClick } from "@/lib/events";
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

export { TrackedProjectLinks };
