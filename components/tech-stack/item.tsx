"use client";

import { AppLink } from "@/components/ui/app-link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TechStackItem as TechStackItemData } from "@/types/tech-stack";

interface TechStackItemProps
  extends
    Omit<React.ComponentProps<"div">, "title">,
    Pick<TechStackItemData, "title" | "href" | "icon" | "categories"> {
  showHeader?: boolean;
  variant?: string;
}

const ShelfIcon = ({
  href,
  icon,
}: Pick<TechStackItemData, "href" | "icon">) => (
  <div className="flex flex-col items-center gap-1">
    <AppLink
      href={href}
      target="_blank"
      external={false}
      className="group/shelf-icon"
    >
      <div
        className="relative flex items-center justify-center rounded-2xl bg-secondary p-3 transition-transform duration-300 ease-out group-hover/shelf-icon:scale-110 sm:p-4"
        style={{ perspective: "600px" }}
      >
        <div className="relative z-10 text-foreground transition-transform duration-300 ease-out group-hover/shelf-icon:-translate-y-0.5">
          {icon}
        </div>
        <div
          className="absolute inset-x-2 bottom-0 h-3 rounded-b-xl"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.822 0 0 / 30%), oklch(0.822 0 0 / 10%))",
            transform: "rotateX(30deg)",
            transformOrigin: "bottom",
          }}
        />
      </div>
    </AppLink>

    <div
      className="relative mx-auto w-14 overflow-hidden sm:w-16"
      style={{
        height: "28px",
        perspective: "600px",
      }}
    >
      <div
        style={{
          transform: "rotateX(20deg)",
          transformOrigin: "top",
        }}
      >
        <div
          className="mx-auto h-1 rounded-full"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.822 0 0 / 40%), transparent)",
            boxShadow: "0 1px 3px oklch(0 0 0 / 8%)",
            width: "82%",
          }}
        />
        <div className="mx-auto mt-0.5 h-16 rounded-b-lg sm:h-[70px]">
          <div
            className="h-full rounded-b-lg"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.922 0 0 / 25%), oklch(0.922 0 0 / 5%))",
            }}
          />
        </div>
      </div>
    </div>

    <div
      className="relative mx-auto w-14 overflow-hidden sm:w-16"
      style={{
        height: "18px",
        marginTop: "-18px",
        perspective: "600px",
      }}
    >
      <div
        style={{
          transform: "scaleY(-1) rotateX(20deg)",
          transformOrigin: "top",
        }}
      >
        <div
          className="mx-auto h-1 rounded-full"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.822 0 0 / 15%), transparent)",
            width: "82%",
          }}
        />
        <div className="mx-auto mt-0.5 h-8 rounded-b-lg opacity-30 blur-[1px] sm:h-9">
          <div
            className="h-full rounded-b-lg"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.922 0 0 / 20%), transparent)",
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

const TechStackItemComponent = ({
  title,
  href,
  icon,
  showHeader: _showHeader = true,
  variant = "list",
  className,
  ...attr
}: TechStackItemProps) => {
  const isGrid = variant === "grid";

  if (isGrid) {
    return (
      <div className={cn("flex", className)} {...attr}>
        <ShelfIcon href={href} icon={icon} />
      </div>
    );
  }

  return (
    <div className={cn("flex", className)} {...attr}>
      <AppLink href={href} target="_blank" external={false}>
        <Badge variant="secondary" className="gap-1.5 font-mono">
          {icon}
          {title}
        </Badge>
      </AppLink>
    </div>
  );
};

export { TechStackItemComponent, type TechStackItemProps };
