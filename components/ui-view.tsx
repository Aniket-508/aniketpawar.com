"use client";

import Link from "next/link";

import { Title } from "@/components/ui/title";
import { ROUTES } from "@/constants/routes";
import type { UiComponent } from "@/lib/ui-components";
import { cn } from "@/lib/utils";

interface UiViewProps {
  components: readonly UiComponent[];
  showHeader?: boolean;
  headerClassName?: string;
}

const UiItem = ({ slug, title }: UiComponent) => {
  const href = `${ROUTES.UI}/${slug}`;

  return (
    <div className="py-4 w-full transition-[border-color,opacity] duration-50 hover:opacity-100 group-hover:opacity-30 flex flex-col items-start gap-1">
      <div className="flex items-center justify-between w-full">
        <Title
          className="font-sans text-base font-normal flex-1"
          render={
            <Link href={href} className="hover:underline underline-offset-4">
              {title}
            </Link>
          }
        />
      </div>
    </div>
  );
};

const UiView = ({
  components,
  showHeader = true,
  headerClassName,
}: UiViewProps) => (
  <>
    {showHeader && (
      <div
        className={cn(
          "flex items-center justify-between gap-4",
          headerClassName
        )}
      >
        <div className="flex-1">
          <Title
            className="text-xl font-medium italic"
            render={<h2>{"ui."}</h2>}
          />
        </div>
      </div>
    )}

    <div className="group grid grid-cols-1">
      {components.map((component) => (
        <UiItem key={component.slug} {...component} />
      ))}
    </div>
  </>
);

export { UiView, type UiViewProps };
