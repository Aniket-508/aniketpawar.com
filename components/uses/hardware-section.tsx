"use client";

import Link from "next/link";
import { useState } from "react";

import { CopyLink } from "@/components/copy-link";
import { MediaPreview } from "@/components/media-preview";
import {
  Glimpse,
  GlimpseContent,
  GlimpseTrigger,
} from "@/components/ui/glimpse";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { ViewToggle } from "@/components/view-tabs";
import type { HardwareItem } from "@/constants/hardware";
import { HARDWARE_ITEMS } from "@/constants/hardware";
import { trackExternalLinkClick } from "@/lib/events";
import type { Variant } from "@/lib/events";
import { cn } from "@/lib/utils";

interface HardwareSectionProps {
  previews?: Record<string, GlimpseData>;
}

interface HardwareRowProps extends Omit<HardwareItem, "key"> {
  preview?: GlimpseData | null;
  variant: Variant;
}

const HardwareRow = ({
  title,
  description,
  href,
  preview,
  variant,
}: HardwareRowProps) => {
  const isGrid = variant === "grid";

  if (isGrid) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackExternalLinkClick({
            context: "uses",
            link_type: "hardware",
            title,
            url: href,
          })
        }
        className="flex w-full min-w-0 flex-col space-y-1 py-4 transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30"
      >
        {preview?.image && (
          <MediaPreview
            src={preview.image}
            title={preview.title ?? title}
            className="mb-2 aspect-1200/630"
          />
        )}
        <Title
          className="font-sans text-base font-normal"
          render={<p>{title}</p>}
        />
        <p className="text-muted-foreground text-sm font-normal">
          {description}
        </p>
      </Link>
    );
  }

  return (
    <Glimpse>
      <GlimpseTrigger
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackExternalLinkClick({
            context: "uses",
            link_type: "hardware",
            title,
            url: href,
          })
        }
        className="flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 py-4 transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30"
      >
        <Title
          className="font-sans text-base font-normal shrink-0"
          render={<p>{title}</p>}
        />
        <p
          className="max-w-[60%] truncate text-muted-foreground text-sm font-normal"
          title={description}
        >
          {description}
        </p>
      </GlimpseTrigger>
      {preview?.image && (
        <GlimpseContent side="left" sideOffset={8} className="w-80 p-0 ring-0">
          <MediaPreview src={preview.image} title={preview.title ?? title} />
        </GlimpseContent>
      )}
    </Glimpse>
  );
};

const HardwareSection = ({ previews }: HardwareSectionProps) => {
  const [variant, setVariant] = useState<Variant>("list");

  return (
    <Section className="delay-300 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="group/hardware flex flex-1 items-center gap-1">
          <Title
            className="text-xl font-medium italic"
            render={<h2>{"hardware."}</h2>}
          />
          <CopyLink
            title={"Hardware"}
            className="hidden group-hover/hardware:inline-flex"
          />
        </div>

        <ViewToggle value={variant} onChange={setVariant} section="hardware" />
      </div>

      <div
        className={cn(
          "group grid grid-cols-1",
          variant === "grid" &&
            "sm:grid-cols-2 sm:[&>*:nth-child(2n+1)]:pr-4 sm:[&>*:nth-child(2n+2)]:pl-4 [&>*:nth-child(2n+1)]:pb-4 [&>*:nth-child(2n+2)]:pb-4",
          variant === "list" && "divide-y divide-border"
        )}
      >
        {HARDWARE_ITEMS.map((item) => (
          <HardwareRow
            key={item.key}
            title={item.title}
            description={item.description}
            href={item.href}
            variant={variant}
            preview={previews?.[item.href]}
          />
        ))}
      </div>
    </Section>
  );
};

export { HardwareSection };
