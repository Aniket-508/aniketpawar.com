"use client";

import { LinkIcon } from "lucide-react";
import Link from "next/link";

import { trackSectionAnchorClick } from "@/lib/events";

const parseTitle = (title: string) => title.toLowerCase().split(" ").join("-");

export const CopyLink = ({
  title,
  onClick,
  ...props
}: { title: string } & Omit<React.ComponentProps<typeof Link>, "href">) => {
  const titleFormatted = parseTitle(title);

  return (
    <Link
      id={`section-link-${titleFormatted}`}
      href={`#${titleFormatted}`}
      aria-label={title}
      onClick={(event) => {
        trackSectionAnchorClick(title);
        onClick?.(event);
      }}
      {...props}
    >
      <LinkIcon className="size-4" />
    </Link>
  );
};
