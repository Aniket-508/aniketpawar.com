"use client";

import { usePathname } from "next/navigation";

import { MoreNavMenu } from "@/components/more-nav-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NAV_GROUPS, NAV_STANDALONE } from "@/constants/site";
import { getActiveSection, getHomeNavItem, isNavGroupActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

const homeItem = getHomeNavItem();

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
    <nav className="flex items-center">
      <NavigationMenu className="hidden sm:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href={homeItem.href}
              className={cn(navLinkClass(homeItem.id), "px-2.5")}
            >
              {homeItem.label}
            </NavigationMenuLink>
          </NavigationMenuItem>

          {NAV_GROUPS.map((group) => (
            <NavigationMenuItem key={group.id}>
              <NavigationMenuTrigger
                className={cn(
                  navLinkClass(group.id),
                  isNavGroupActive(group.items, activeSection) &&
                    "data-open:text-foreground"
                )}
              >
                {group.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col gap-1 p-2">
                  {group.items.map((item) => (
                    <NavigationMenuLink
                      key={item.id}
                      href={item.href}
                      className={cn(navLinkClass(item.id), "w-48")}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}

          {NAV_STANDALONE.filter((item) => item.id !== "home").map((item) => (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuLink
                href={item.href}
                className={cn(navLinkClass(item.id), "px-2.5")}
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <MoreNavMenu activeSection={activeSection} className="sm:hidden" />
    </nav>
  );
};

export { MainNav };
