"use client";

import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ROUTES } from "@/constants/routes";
import { NAV_GROUPS } from "@/constants/site";
import { getActiveSection, getHomeNavItem, isNavGroupActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

const homeItem = getHomeNavItem();
const workGroup = NAV_GROUPS.find((g) => g.id === "work") ?? {
  id: "work" as const,
  items: [],
  label: "work",
};
const extrasGroup = NAV_GROUPS.find((g) => g.id === "extras") ?? {
  id: "extras" as const,
  items: [],
  label: "extras",
};

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
    <div className="flex items-center">
      <nav className="flex items-center">
        <NavigationMenu>
          <NavigationMenuList>
            {/* Home — always visible */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href={homeItem.href}
                className={cn(navLinkClass(homeItem.id), "-ml-2.5")}
              >
                {homeItem.label}
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Work — trigger on sm+, link on mobile */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  navLinkClass(workGroup.id),
                  isNavGroupActive(workGroup.items, activeSection) &&
                    "data-open:text-foreground"
                )}
              >
                {workGroup.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col p-1 w-fit">
                  {workGroup.items.map((item) => (
                    <NavigationMenuLink
                      key={item.id}
                      href={item.href}
                      className={cn(navLinkClass(item.id))}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Extras — trigger on sm+, inside more on mobile/tablet */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  navLinkClass(extrasGroup.id),
                  "hidden sm:inline-flex",
                  isNavGroupActive(extrasGroup.items, activeSection) &&
                    "data-open:text-foreground"
                )}
              >
                {extrasGroup.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col p-1 w-fit">
                  {extrasGroup.items.map((item) => (
                    <NavigationMenuLink
                      key={item.id}
                      href={item.href}
                      className={cn(navLinkClass(item.id))}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Contact — visible on sm+ */}
            <NavigationMenuItem>
              <NavigationMenuLink
                href={ROUTES.CONTACT}
                className={cn(navLinkClass("contact"), "hidden sm:inline-flex")}
              >
                contact
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* More — visible below sm, contains extras/writing/contact */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm text-muted-foreground transition-colors hover:text-foreground sm:hidden">
                more
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col p-1 w-fit">
                  <span className="px-1.5 py-1 text-xs font-medium text-muted-foreground">
                    {extrasGroup.label}
                  </span>
                  {extrasGroup.items.map((item) => (
                    <NavigationMenuLink
                      key={item.id}
                      href={item.href}
                      className={cn(navLinkClass(item.id))}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  ))}
                  <div className="-mx-1 my-1 h-px bg-border" />
                  <NavigationMenuLink
                    href={ROUTES.CONTACT}
                    className={cn(navLinkClass("contact"))}
                  >
                    contact
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
};

export { MainNav };
