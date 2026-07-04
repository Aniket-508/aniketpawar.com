"use client";

import { usePathname } from "next/navigation";

import { MoreNavMenu } from "@/components/more-nav-menu";
import { NavGroupMenu } from "@/components/nav-group-menu";
import { AppLink } from "@/components/ui/app-link";
import { NAV_ITEMS } from "@/constants/site";
import {
  getActiveSection,
  getHomeNavItem,
  getNavGroupsInOrder,
  getStandaloneNavItems,
} from "@/lib/nav";
import { cn } from "@/lib/utils";

const homeItem = getHomeNavItem();
const standaloneItems = getStandaloneNavItems(NAV_ITEMS).filter(
  (item) => item.id !== "home"
);
const navGroups = getNavGroupsInOrder(NAV_ITEMS);
const moreItems = NAV_ITEMS.filter((item) => item.id !== "home");

const MainNav = () => {
  const pathname = usePathname();
  const activeSection = getActiveSection(pathname);

  const navLinkClass = (id: string) =>
    cn(
      "text-sm transition-colors",
      activeSection === id
        ? "text-foreground"
        : "text-muted-foreground hover:text-foreground"
    );

  return (
    <nav className="flex items-center [&_a:first-child]:mr-4">
      <AppLink
        href={homeItem.href}
        className={navLinkClass(homeItem.id)}
        eventName="navbar_section_click"
        eventProperties={{ section: homeItem.id }}
      >
        {homeItem.label}
      </AppLink>

      {navGroups.map(({ group, items }) => (
        <NavGroupMenu
          key={group}
          group={group}
          items={items}
          activeSection={activeSection}
          className="hidden sm:flex"
        />
      ))}

      {standaloneItems.map((item) => (
        <AppLink
          key={item.id}
          href={item.href}
          className={cn(navLinkClass(item.id), "hidden sm:inline-flex")}
          eventName="navbar_section_click"
          eventProperties={{ section: item.id }}
        >
          {item.label}
        </AppLink>
      ))}

      <MoreNavMenu
        items={moreItems}
        activeSection={activeSection}
        className="sm:hidden"
      />
    </nav>
  );
};

export { MainNav };
