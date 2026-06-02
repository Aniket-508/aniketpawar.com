"use client";

import { LinkIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { trackSectionAnchorClick } from "@/lib/events";
import { cn } from "@/lib/utils";

const parseTitle = (title: string) => title.toLowerCase().split(" ").join("-");

export const CopyLink = ({
  title,
  className,
  onClick,
  ...props
}: { title: string } & React.ComponentProps<typeof Button>) => {
  const titleFormatted = parseTitle(title);

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={cn("text-muted-foreground", className)}
      aria-label={title}
      onClick={(event) => {
        trackSectionAnchorClick(title);
        onClick?.(event);
      }}
      {...props}
      asChild
    >
      <Link id={`section-link-${titleFormatted}`} href={`#${titleFormatted}`}>
        <LinkIcon className="size-4" />
      </Link>
    </Button>
  );
};
