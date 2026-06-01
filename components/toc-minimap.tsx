"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { trackTocMinimapHover, trackTocMinimapItemClick } from "@/lib/events";
import { cn } from "@/lib/utils";
import type { TOCItem } from "@/types/projects";

import { AnchorProvider, useActiveAnchor, useItems } from "./toc";

export interface TOCMinimapProps {
  items: TOCItem[];
  options?: IntersectionObserverInit;
  className?: string;
}

const getHeadingElement = (url: string) =>
  document.querySelector(`#${CSS.escape(url.replace("#", ""))}`);

const scrollToHeading = (url: string) => {
  history.pushState(null, "", url);
  getHeadingElement(url)?.scrollIntoView({
    behavior: "smooth",
  });
};

const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  const url = e.currentTarget.getAttribute("href") ?? "";
  const title = e.currentTarget.textContent ?? "";
  const depth = Number(e.currentTarget.dataset.depth);
  trackTocMinimapItemClick(title, url, depth);
  scrollToHeading(url);
};

const TOCMinimapContainer = (props: React.ComponentProps<"div">) => {
  const activeAnchor = useActiveAnchor();
  return <div data-active-anchor={activeAnchor} {...props} />;
};

const Minimap = () => {
  const items = useItems();

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          data-depth={item.original.depth}
          data-active={item.active}
          className={cn(
            "pointer-events-none h-0.5 w-6 shrink-0 rounded-xs bg-ring/50 transition-[background-color] duration-200",
            "data-[depth=3]:ml-2 data-[depth=3]:w-4",
            "data-[depth=4]:ml-4 data-[depth=4]:w-2",
            "data-active:bg-foreground"
          )}
          aria-hidden
        />
      ))}
    </>
  );
};

const TOCList = () => {
  const items = useItems();

  return (
    <ul className="flex size-full flex-col px-6 py-4 text-sm">
      {items.map((item) => (
        <li key={item.id} className="flex py-1">
          <a
            href={item.original.url}
            data-depth={item.original.depth}
            data-active={item.active}
            className={cn(
              "line-clamp-2 w-full transition-[color] duration-200",
              "text-muted-foreground hover:text-foreground data-active:text-foreground",
              "data-[depth=3]:pl-4 data-[depth=4]:pl-8"
            )}
            onClick={handleItemClick}
          >
            {item.original.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export const TOCMinimap = ({ items, options, className }: TOCMinimapProps) => {
  if (!items.length) {
    return null;
  }

  return (
    <AnchorProvider toc={items} options={options}>
      <TOCMinimapContainer className={cn("ml-auto w-18", className)}>
        <HoverCard
          openDelay={0}
          closeDelay={0}
          onOpenChange={(open) => {
            if (open) {
              trackTocMinimapHover();
            }
          }}
        >
          <HoverCardTrigger asChild>
            <div className="flex max-h-[calc(100dvh-var(--doc-cols-top,0)+(--spacing(-24)))] flex-col gap-3 overflow-hidden py-3 pl-6 opacity-100 transition-opacity duration-200 data-popup-open:opacity-0">
              <Minimap />
            </div>
          </HoverCardTrigger>

          <HoverCardContent
            className="w-56 overflow-hidden p-0 duration-200 data-[side=left]:slide-in-from-right-3 data-[side=left]:slide-out-to-right-3 data-open:zoom-in-100 data-closed:zoom-out-95"
            align="start"
            alignOffset={0}
            side="left"
            sideOffset={-60}
          >
            <div className="flex max-h-[calc(100dvh-var(--doc-cols-top,0)+(--spacing(-24)))] overflow-y-auto overscroll-contain">
              <TOCList />
            </div>
          </HoverCardContent>
        </HoverCard>
      </TOCMinimapContainer>
    </AnchorProvider>
  );
};
