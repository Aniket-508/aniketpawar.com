"use client";

import { ChevronDownIcon } from "lucide-react";

import { NavDropdownSections } from "@/components/nav-dropdown-sections";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_GROUPS, NAV_STANDALONE } from "@/constants/site";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types/nav";

interface MoreNavMenuProps {
  activeSection: SectionId | null;
  className?: string;
}

const MoreNavMenu = ({ activeSection, className }: MoreNavMenuProps) => {
  const standaloneItems = NAV_STANDALONE.filter((item) => item.id !== "home");

  if (standaloneItems.length === 0 && NAV_GROUPS.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "font-normal text-sm text-muted-foreground hover:text-foreground",
              className
            )}
          />
        }
      >
        more
        <ChevronDownIcon className="ml-1 size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <NavDropdownSections
          activeSection={activeSection}
          groups={NAV_GROUPS}
          standaloneItems={standaloneItems}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { MoreNavMenu };
