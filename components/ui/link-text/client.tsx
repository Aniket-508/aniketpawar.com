"use client";

import type { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { useSound } from "@web-kits/audio/react";
import { ArrowUpRight } from "lucide-react";

import { hover, tap } from "@/audio/core";
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
  typeof PreviewCardPrimitive.Trigger
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
  onPointerEnter,
  onPointerDown,
  ...attr
}: LinkTextClientProps) => {
  const playHover = useSound(hover);
  const playTap = useSound(tap);

  return (
    <Glimpse>
      <GlimpseTrigger
        delay={0.1}
        closeDelay={0.1}
        className={cn(
          "after:bg-primary hover:text-primary active:text-primary relative flex flex-row items-center justify-start gap-0.5 text-base font-medium transition-all after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:transition-all after:duration-300 hover:gap-1 hover:after:w-full",
          className
        )}
        href={href}
        onPointerEnter={(event) => {
          playHover();
          onPointerEnter?.(event);
        }}
        onPointerDown={(event) => {
          if (event.button === 0) {
            playTap();
          }
          onPointerDown?.(event);
        }}
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
};

export { LinkTextClient, type LinkTextClientProps };
