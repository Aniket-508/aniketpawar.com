import { ArrowUpRight } from "lucide-react";
import type { HoverCard as HoverCardPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

import type { GlimpseContentProps } from "./glimpse";
import {
  Glimpse,
  GlimpseContent,
  GlimpseDescription,
  GlimpseImage,
  GlimpseTitle,
  GlimpseTrigger,
} from "./glimpse";
import { glimpse } from "./glimpse/server";

interface LinkTextProps extends React.ComponentProps<
  typeof HoverCardPrimitive.Trigger
> {
  children?: React.ReactNode;
  className?: string;
  preview?: boolean;
  side?: GlimpseContentProps["side"];
}

const LinkText = async ({
  className,
  preview = true,
  href,
  side = "right",
  ...attr
}: LinkTextProps) => {
  let data;

  if (preview && href) {
    data = await glimpse(href);
  }

  return (
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
      {preview && data && data.title && (
        <GlimpseContent side={side} className="z-99 w-80">
          <GlimpseImage src={data.image} />
          <GlimpseTitle>{data.title}</GlimpseTitle>
          <GlimpseDescription>{data.description}</GlimpseDescription>
        </GlimpseContent>
      )}
    </Glimpse>
  );
};

export { LinkText };
