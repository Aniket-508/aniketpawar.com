"use client";

import Link from "next/link";

import { MediaPreview } from "@/components/media-preview";
import {
  Glimpse,
  GlimpseContent,
  GlimpseTrigger,
} from "@/components/ui/glimpse";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Title } from "@/components/ui/title";
import { trackExternalLinkClick } from "@/lib/events";
import { cn } from "@/lib/utils";
import type { Favorite } from "@/types/favorites";

interface FavoriteItemProps
  extends Favorite, Omit<React.ComponentProps<"div">, "title"> {
  showHeader?: boolean;
  variant?: string;
  preview?: GlimpseData | null;
}

const FavoriteItem = ({
  slug,
  title,
  description,
  url,
  showHeader = true,
  variant = "list",
  preview,
  className,
}: FavoriteItemProps) => {
  const isGrid = variant === "grid";

  const handleLinkClick = () => {
    trackExternalLinkClick({
      context: showHeader ? "home" : "listing",
      link_type: "favorite",
      slug,
      title,
      url,
    });
  };

  if (isGrid) {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLinkClick}
        className={cn(
          "py-4 w-full space-y-1 transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30 block",
          className
        )}
      >
        {preview?.image && (
          <MediaPreview
            src={preview.image}
            title={title}
            className="mb-2 aspect-1200/630"
          />
        )}
        <div className="flex items-center justify-between gap-4">
          <Title
            className="font-sans text-base font-normal"
            render={showHeader ? <h3>{title}</h3> : <h2>{title}</h2>}
          />
        </div>
        <p className="text-muted-foreground text-sm font-normal">
          {description}
        </p>
      </Link>
    );
  }

  return (
    <Glimpse>
      <GlimpseTrigger
        className={cn(
          "py-4 w-full transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30 flex items-center justify-between gap-2 min-w-0 cursor-pointer",
          className
        )}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLinkClick}
      >
        <Title
          className="font-sans text-base font-normal flex-1"
          render={showHeader ? <h3>{title}</h3> : <h2>{title}</h2>}
        />
        <p
          className="text-muted-foreground text-sm font-normal truncate max-w-[60%]"
          title={description}
        >
          {description}
        </p>
      </GlimpseTrigger>
      {preview?.image && (
        <GlimpseContent side="left" sideOffset={8} className="ring-0 w-80">
          <MediaPreview src={preview.image} title={title} />
        </GlimpseContent>
      )}
    </Glimpse>
  );
};

export { FavoriteItem, type FavoriteItemProps };
