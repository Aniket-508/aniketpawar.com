"use client";

import Link from "next/link";
import { Fragment } from "react";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getNavGroupLabel } from "@/lib/nav";
import { cn } from "@/lib/utils";
import type { NavDropdownSection, NavItem, SectionId } from "@/types/nav";

interface NavDropdownSectionsProps {
  activeSection: SectionId | null;
  sections: NavDropdownSection[];
  showGroupLabels?: boolean;
}

const NavDropdownLink = ({
  activeSection,
  item,
}: {
  activeSection: SectionId | null;
  item: NavItem;
}) => (
  <DropdownMenuItem
    key={item.id}
    render={
      <Link
        href={item.href}
        className={cn(
          activeSection === item.id && "bg-accent text-accent-foreground"
        )}
      />
    }
  >
    {item.label}
  </DropdownMenuItem>
);

const NavDropdownSections = ({
  activeSection,
  sections,
  showGroupLabels = true,
}: NavDropdownSectionsProps) => (
  <>
    {sections.map((section, index) => (
      <Fragment key={section.type === "item" ? section.item.id : section.group}>
        {index > 0 ? <DropdownMenuSeparator /> : null}
        {section.type === "item" ? (
          <NavDropdownLink activeSection={activeSection} item={section.item} />
        ) : (
          <DropdownMenuGroup>
            {showGroupLabels ? (
              <DropdownMenuLabel>
                {getNavGroupLabel(section.group)}
              </DropdownMenuLabel>
            ) : null}
            {section.items.map((item) => (
              <NavDropdownLink
                key={item.id}
                activeSection={activeSection}
                item={item}
              />
            ))}
          </DropdownMenuGroup>
        )}
      </Fragment>
    ))}
  </>
);

export { NavDropdownSections };
