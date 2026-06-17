"use client";

import { useSound } from "@web-kits/audio/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { hover, tap } from "@/audio/core";
import { MediaPreview } from "@/components/media-preview";
import type { GlimpseContentProps } from "@/components/ui/glimpse";
import {
  Glimpse,
  GlimpseContent,
  GlimpseTrigger,
} from "@/components/ui/glimpse";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { UTM_PARAMS } from "@/constants/site";
import { trackEvent } from "@/lib/events";
import type { EventName } from "@/lib/events";
import { addQueryParams } from "@/lib/url";
import { cn } from "@/lib/utils";

interface AppLinkProps extends React.ComponentProps<typeof Link> {
  eventName?: EventName;
  eventProperties?: Record<string, string | number | boolean | null>;
  sound?: boolean;
  external?: boolean;
  preview?: GlimpseData | null;
  previewSide?: GlimpseContentProps["side"];
}

const AppLink = ({
  eventName,
  eventProperties,
  sound = true,
  external = false,
  preview,
  previewSide = "right",
  className,
  onClick,
  children,
  href,
  ...props
}: AppLinkProps) => {
  const playHover = useSound(hover);
  const playTap = useSound(tap);

  const linkClassName = cn(
    external &&
      "after:bg-primary hover:text-primary active:text-primary relative flex flex-row items-center justify-start gap-0.5 text-base font-medium transition-all after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:transition-all after:duration-300 hover:gap-1 hover:after:w-full",
    className
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (sound && event.button === 0) {
      playTap();
    }
    props.onPointerDown?.(event);
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (sound) {
      playHover();
    }
    props.onPointerEnter?.(event);
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (eventName) {
      trackEvent({ name: eventName, properties: eventProperties });
    }
    onClick?.(event);
  };

  const hrefString = typeof href === "string" ? href : (href?.pathname ?? "");

  if (external) {
    return (
      <Glimpse>
        <GlimpseTrigger
          className={linkClassName}
          href={addQueryParams(hrefString, UTM_PARAMS)}
          onPointerEnter={handlePointerEnter}
          onPointerDown={handlePointerDown}
          {...props}
        >
          <span>{children}</span>
          <ArrowUpRight className="h-4 w-4" />
        </GlimpseTrigger>
        {preview?.image && (
          <GlimpseContent side={previewSide} className="ring-0 p-0 w-80">
            <MediaPreview src={preview.image} title={preview.title ?? ""} />
          </GlimpseContent>
        )}
      </Glimpse>
    );
  }

  return (
    <Link
      className={linkClassName}
      href={href}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {children}
    </Link>
  );
};

export { AppLink, type AppLinkProps };
