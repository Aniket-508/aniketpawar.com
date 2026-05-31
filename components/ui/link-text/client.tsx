"use client";

import { ArrowUpRight } from "lucide-react";
import type { HoverCard as HoverCardPrimitive } from "radix-ui";

import type { GlimpseContentProps } from "@/components/ui/glimpse";
import {
  Glimpse,
  GlimpseContent,
  GlimpseDescription,
  GlimpseImage,
  GlimpseTitle,
  GlimpseTrigger,
} from "@/components/ui/glimpse";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { cn } from "@/lib/utils";

interface LinkTextClientProps extends React.ComponentProps<
  typeof HoverCardPrimitive.Trigger
> {
  children?: React.ReactNode;
  className?: string;
  preview?: GlimpseData | null;
  side?: GlimpseContentProps["side"];
}

const LinkTextClient = ({
  className,
  preview,
  href,
  side = "right",
  ...attr
}: LinkTextClientProps) => (
  <Glimpse openDelay={500}>
    <GlimpseTrigger
      className={cn(
        "after:bg-primary hover:text-primary active:text-primary relative flex flex-row items-center justify-start gap-0.5 text-base font-medium transition-all after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:transition-all after:duration-300 hover:gap-1 hover:after:w-full",
        className
      )}
      href={href}
      {...attr}
    >
      <span>{attr?.children}</span>
      <ArrowUpRight className="h-4 w-4" />
    </GlimpseTrigger>
    {preview?.title && (
      <GlimpseContent side={side} className="z-99 w-80">
        <GlimpseImage src={preview.image ?? undefined} />
        <GlimpseTitle>{preview.title}</GlimpseTitle>
        <GlimpseDescription>{preview.description}</GlimpseDescription>
      </GlimpseContent>
    )}
  </Glimpse>
);

export { LinkTextClient, type LinkTextClientProps };
