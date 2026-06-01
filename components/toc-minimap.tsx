"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { TOCItem } from "@/types/projects";

interface TOCMinimapProps {
  items: TOCItem[];
  className?: string;
}

const TOCMinimap = ({ items, className }: TOCMinimapProps) => {
  const [activeId, setActiveId] = useState<string>(
    items[0]?.url.replace("#", "") ?? ""
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const updateActiveSection = useCallback(() => {
    const offsets = items
      .map((item) => {
        const id = item.url.replace("#", "");
        const element = document.querySelector(`#${id}`);
        if (!element) {
          return null;
        }
        return { id, top: element.getBoundingClientRect().top };
      })
      .filter((entry): entry is { id: string; top: number } => entry !== null);

    const viewportMiddle = window.innerHeight * 0.35;
    const passed = offsets.filter((entry) => entry.top <= viewportMiddle);
    const active = passed.at(-1) ?? offsets[0];

    if (active) {
      setActiveId(active.id);
    }
  }, [items]);

  useEffect(() => {
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [updateActiveSection]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 lg:block",
        className
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onFocus={() => setIsExpanded(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsExpanded(false);
        }
      }}
    >
      <div
        className={cn(
          "rounded-lg border border-border bg-background/80 p-2 shadow-sm backdrop-blur-sm transition-all duration-200",
          isExpanded ? "w-52" : "w-8"
        )}
      >
        <ul
          className={cn(
            "flex flex-col gap-1 transition-opacity duration-200",
            isExpanded ? "opacity-100" : "opacity-0"
          )}
        >
          {items.map((item) => {
            const id = item.url.replace("#", "");
            const isActive = activeId === id;

            return (
              <li
                key={item.url}
                style={{ paddingLeft: `${(item.depth - 1) * 8}px` }}
              >
                <Link
                  href={item.url}
                  className={cn(
                    "block truncate rounded-md px-2 py-1 text-xs transition-colors",
                    isActive
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                  onClick={() => setActiveId(id)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className={cn(
            "flex flex-col items-center gap-1 py-1 transition-opacity duration-200",
            isExpanded
              ? "pointer-events-none absolute opacity-0"
              : "opacity-100"
          )}
          aria-hidden={isExpanded}
        >
          {items.map((item) => {
            const id = item.url.replace("#", "");
            const isActive = activeId === id;

            return (
              <span
                key={item.url}
                className={cn(
                  "block h-1 rounded-full transition-all",
                  isActive ? "w-4 bg-foreground" : "w-2 bg-muted-foreground/40"
                )}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export { TOCMinimap };
