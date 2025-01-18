"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/utils/helper";
import { ArrowUpRight } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./HoverCard";
import { HoverCardTriggerProps } from "@radix-ui/react-hover-card";

interface LinkTextProps extends HoverCardTriggerProps {
  children?: React.ReactNode;
  className?: string;
  preview?: boolean;
}

const LinkText: React.FunctionComponent<LinkTextProps> = ({
  className,
  preview = true,
  ...attr
}) => {
  const [src, setSrc] = useState(
    attr.href
      ? `https://v1.opengraph.11ty.dev/${encodeURIComponent(attr.href)}/onerror`
      : ""
  );

  return (
    <HoverCard openDelay={500}>
      <HoverCardTrigger
        className={cn(
          "flex flex-row items-center justify-start gap-0.5 text-base font-medium transition-all text-zinc-900 hover:text-zinc-700 relative after:bg-black after:absolute after:h-[1.5px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 hover:gap-1 active:text-black",
          className
        )}
        {...attr}
      >
        <span>{attr?.children}</span>
        <ArrowUpRight className="w-4" />
      </HoverCardTrigger>
      {preview && (
        <HoverCardContent>
          <Image
            src={src}
            priority
            unoptimized
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt={`${attr.href} preview`}
            onError={() => {
              setSrc("https://placehold.co/1200x630?text=Preview+Not+Found");
            }}
          />
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export default LinkText;
