"use client";

import { ChevronDownIcon } from "lucide-react";

import { NavDropdownSections } from "@/components/nav-dropdown-sections";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getNavDropdownSections,
  getNavGroupLabel,
  isNavGroupActive,
} from "@/lib/nav";
import { cn } from "@/lib/utils";
import type { NavGroupId, NavItem, SectionId } from "@/types/nav";

interface NavGroupMenuProps {
  activeSection: SectionId | null;
  className?: string;
  group: NavGroupId;
  items: NavItem[];
}

const NavGroupMenu = ({
  activeSection,
  className,
  group,
  items,
}: NavGroupMenuProps) => {
  const sections = getNavDropdownSections(items);
  const isActive = isNavGroupActive(items, activeSection);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "font-normal text-sm hover:text-foreground",
              isActive ? "text-foreground" : "text-muted-foreground",
              className
            )}
          />
        }
      >
        {getNavGroupLabel(group)}
        <ChevronDownIcon className="ml-1 size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <NavDropdownSections
          activeSection={activeSection}
          sections={sections}
          showGroupLabels={false}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { NavGroupMenu };
