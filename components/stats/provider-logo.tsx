import { cn } from "@/lib/utils";

export const ProviderLogo = ({
  url,
  className,
}: {
  url: string;
  className?: string;
}) => (
  <span
    aria-hidden="true"
    className={cn("size-3.5 shrink-0 bg-current", className)}
    style={{
      WebkitMaskImage: `url(${url})`,
      WebkitMaskPosition: "center",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskImage: `url(${url})`,
      maskPosition: "center",
      maskRepeat: "no-repeat",
      maskSize: "contain",
    }}
  />
);
