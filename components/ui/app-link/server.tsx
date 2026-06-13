import type { GlimpseContentProps } from "@/components/ui/glimpse";
import { glimpse } from "@/components/ui/glimpse/server";

import { AppLink } from ".";
import type { AppLinkProps } from ".";

interface AppLinkWithPreviewProps extends Omit<AppLinkProps, "preview"> {
  fetchPreview?: boolean;
  previewSide?: GlimpseContentProps["side"];
}

const AppLinkWithPreview = async ({
  fetchPreview = true,
  href,
  previewSide = "right",
  ...props
}: AppLinkWithPreviewProps) => {
  const data = fetchPreview && href ? await glimpse(href as string) : null;

  return (
    <AppLink
      href={href}
      external
      preview={data}
      previewSide={previewSide}
      {...props}
    />
  );
};

export { AppLinkWithPreview, type AppLinkWithPreviewProps };
