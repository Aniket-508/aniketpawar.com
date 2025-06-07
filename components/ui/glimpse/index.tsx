"use client"

import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard"

export type GlimpseProps = ComponentProps<typeof HoverCard>

export const Glimpse = (props: GlimpseProps) => {
  return <HoverCard {...props} />
}

export type GlimpseContentProps = ComponentProps<typeof HoverCardContent>

export const GlimpseContent = (props: GlimpseContentProps) => (
  <HoverCardContent {...props} />
)

export type GlimpseTriggerProps = ComponentProps<typeof HoverCardTrigger>

export const GlimpseTrigger = (props: GlimpseTriggerProps) => (
  <HoverCardTrigger {...props} />
)

export type GlimpseTitleProps = ComponentProps<"p">

export const GlimpseTitle = ({ className, ...props }: GlimpseTitleProps) => {
  return (
    <p className={cn("truncate text-sm font-semibold", className)} {...props} />
  )
}

export type GlimpseDescriptionProps = ComponentProps<"p">

export const GlimpseDescription = ({
  className,
  ...props
}: GlimpseDescriptionProps) => {
  return (
    <p
      className={cn("line-clamp-2 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export type GlimpseImageProps = ComponentProps<"img">

export const GlimpseImage = ({
  className,
  alt,
  ...props
}: GlimpseImageProps) => {
  return (
    <img
      alt=""
      className={cn(
        "mb-4 aspect-[120/63] w-full rounded-md border object-cover",
        className
      )}
      {...props}
    />
  )
}
