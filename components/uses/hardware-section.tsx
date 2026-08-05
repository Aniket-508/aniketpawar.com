"use client";

import { MediaPreview } from "@/components/media-preview";
import {
  Glimpse,
  GlimpseContent,
  GlimpseTrigger,
} from "@/components/ui/glimpse";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import type { HardwareItem } from "@/constants/hardware";
import { HARDWARE_ITEMS } from "@/constants/hardware";
import { trackExternalLinkClick } from "@/lib/events";

interface HardwareSectionProps {
  previews?: Record<string, GlimpseData>;
}

interface HardwareRowProps extends Omit<HardwareItem, "key"> {
  preview?: GlimpseData | null;
}

const HardwareRow = ({
  title,
  description,
  href,
  preview,
}: HardwareRowProps) => (
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
        className="font-sans text-base font-normal flex-1"
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

const HardwareSection = ({ previews }: HardwareSectionProps) => (
  <Section className="delay-300 flex flex-col gap-4">
    <div className="flex items-center gap-1">
      <Title
        className="text-xl font-medium italic"
        render={<h2>{"hardware."}</h2>}
      />
    </div>
    <div className="group flex flex-col divide-y divide-border">
      {HARDWARE_ITEMS.map((item) => (
        <HardwareRow
          key={item.key}
          title={item.title}
          description={item.description}
          href={item.href}
          preview={previews?.[item.href]}
        />
      ))}
    </div>
  </Section>
);

export { HardwareSection };
