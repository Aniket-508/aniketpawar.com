"use client";

import Link from "next/link";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { NavGroup, NavItem, SectionId } from "@/types/nav";

interface NavDropdownSectionsProps {
  activeSection: SectionId | null;
  groups: NavGroup[];
  standaloneItems: NavItem[];
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
  groups,
  standaloneItems,
}: NavDropdownSectionsProps) => (
  <>
    {standaloneItems.map((item, index) => (
      <div key={item.id}>
        {index > 0 || groups.length > 0 ? <DropdownMenuSeparator /> : null}
        <NavDropdownLink activeSection={activeSection} item={item} />
      </div>
    ))}
    {groups.map((group) => (
      <div key={group.id}>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
          {group.items.map((item) => (
            <NavDropdownLink
              key={item.id}
              activeSection={activeSection}
              item={item}
            />
          ))}
        </DropdownMenuGroup>
      </div>
    ))}
  </>
);

export { NavDropdownSections };
