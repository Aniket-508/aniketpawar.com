"use client";

import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavMenuItem {
  href: string;
  id: string;
  label: string;
}

interface MoreNavMenuProps {
  items: NavMenuItem[];
  groupLabel: string;
  activeSection: string | null;
  className?: string;
}

const MoreNavMenu = ({
  items,
  groupLabel,
  activeSection,
  className,
}: MoreNavMenuProps) => {
  const regularItems = items.filter(
    (item) => !["stack", "favorites"].includes(item.id)
  );
  const groupItems = items.filter((item) =>
    ["stack", "favorites"].includes(item.id)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "-translate-x-1.5 font-normal text-sm text-muted-foreground hover:text-foreground",
              className
            )}
          />
        }
      >
        more
        <ChevronDownIcon className="ml-1 size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {regularItems.map((item) => (
          <DropdownMenuItem
            key={item.id}
            render={
              <Link
                href={item.href}
                className={cn(
                  activeSection === item.id &&
                    "bg-accent text-accent-foreground"
                )}
              />
            }
          >
            {item.label}
          </DropdownMenuItem>
        ))}
        {groupItems.length > 0 && (
          <>
            {regularItems.length > 0 && <DropdownMenuSeparator />}
            <DropdownMenuGroup>
              <DropdownMenuLabel>{groupLabel}</DropdownMenuLabel>
              {groupItems.map((item) => (
                <DropdownMenuItem
                  key={item.id}
                  render={
                    <Link
                      href={item.href}
                      className={cn(
                        activeSection === item.id &&
                          "bg-accent text-accent-foreground"
                      )}
                    />
                  }
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { MoreNavMenu };
