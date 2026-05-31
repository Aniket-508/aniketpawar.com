import type { HoverCard as HoverCardPrimitive } from "radix-ui";

import type { GlimpseContentProps } from "@/components/ui/glimpse";
import { glimpse } from "@/components/ui/glimpse/server";
import { LinkTextClient } from "@/components/ui/link-text/client";

interface LinkTextProps extends React.ComponentProps<
  typeof HoverCardPrimitive.Trigger
> {
  children?: React.ReactNode;
  className?: string;
  preview?: boolean;
  side?: GlimpseContentProps["side"];
}

const LinkText = async ({ preview = true, href, ...props }: LinkTextProps) => {
  const data = preview && href ? await glimpse(href) : null;

  return <LinkTextClient href={href} preview={data} {...props} />;
};

export { LinkText };
