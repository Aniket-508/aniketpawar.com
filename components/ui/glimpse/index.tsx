"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export type GlimpseProps = React.ComponentProps<typeof HoverCard>;

export const Glimpse = (props: GlimpseProps) => <HoverCard {...props} />;

export type GlimpseContentProps = React.ComponentProps<typeof HoverCardContent>;

export const GlimpseContent = (props: GlimpseContentProps) => (
  <HoverCardContent {...props} />
);

export type GlimpseTriggerProps = React.ComponentProps<typeof HoverCardTrigger>;

export const GlimpseTrigger = (props: GlimpseTriggerProps) => (
  <HoverCardTrigger {...props} />
);

export type GlimpseTitleProps = React.ComponentProps<"p">;

export const GlimpseTitle = ({ className, ...props }: GlimpseTitleProps) => (
  <p className={cn("truncate text-sm font-semibold", className)} {...props} />
);

export type GlimpseDescriptionProps = React.ComponentProps<"p">;

export const GlimpseDescription = ({
  className,
  ...props
}: GlimpseDescriptionProps) => (
  <p
    className={cn("text-muted-foreground line-clamp-2 text-sm", className)}
    {...props}
  />
);

export type GlimpseImageProps = React.ComponentProps<"img">;

export const GlimpseImage = ({
  className,
  alt: _alt,
  ...props
}: GlimpseImageProps) => (
  // eslint-disable-next-line next/no-img-element
  <img
    alt=""
    className={cn(
      "mb-2.5 aspect-[120/63] w-full rounded-md border object-cover",
      className
    )}
    {...props}
  />
);
