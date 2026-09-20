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
import type { NavGroup, NavGroupId, SectionId } from "@/types/nav";

const homeItem = getHomeNavItem();

const findGroup = (id: NavGroupId, label: string): NavGroup =>
  NAV_GROUPS.find((group) => group.id === id) ?? { id, items: [], label };

const workGroup = findGroup("work", "work");
// const uiGroup = findGroup("ui", "ui");
const extrasGroup = findGroup("extras", "extras");

const navLinkClass = (id: string, activeSection: SectionId | null) =>
  cn(
    "text-sm transition-colors",
    activeSection === id
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground"
  );

interface NavGroupMenuProps {
  group: NavGroup;
  activeSection: SectionId | null;
  triggerClassName?: string;
}

const NavGroupMenu = ({
  activeSection,
  group,
  triggerClassName,
}: NavGroupMenuProps) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger
      className={cn(
        navLinkClass(group.id, activeSection),
        triggerClassName,
        isNavGroupActive(group.items, activeSection) &&
          "data-open:text-foreground"
      )}
    >
      {group.label}
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <div className="flex flex-col p-1 w-fit">
        {group.items.map((item) => (
          <NavigationMenuLink
            className={navLinkClass(item.id, activeSection)}
            href={item.href}
            key={item.id}
          >
            {item.label}
          </NavigationMenuLink>
        ))}
      </div>
    </NavigationMenuContent>
  </NavigationMenuItem>
);

const MainNav = () => {
  const pathname = usePathname();
  const activeSection = getActiveSection(pathname);

  return (
    <div className="flex items-center">
      <nav className="flex items-center">
        <NavigationMenu>
          <NavigationMenuList>
            {/* Home — always visible */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navLinkClass(homeItem.id, activeSection),
                  "-ml-2.5"
                )}
                href={homeItem.href}
              >
                {homeItem.label}
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Work — trigger on sm+, link on mobile */}
            <NavGroupMenu activeSection={activeSection} group={workGroup} />

            {/* UI — registry components and blocks */}
            {/* <NavGroupMenu activeSection={activeSection} group={uiGroup} /> */}

            {/* Extras — trigger on sm+, inside more on mobile/tablet */}
            <NavGroupMenu
              activeSection={activeSection}
              group={extrasGroup}
              triggerClassName="hidden sm:inline-flex"
            />

            {/* Contact — visible on sm+ */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navLinkClass("contact", activeSection),
                  "hidden sm:inline-flex"
                )}
                href={ROUTES.CONTACT}
              >
                contact
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* More — visible below sm, contains extras/contact */}
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
                      className={navLinkClass(item.id, activeSection)}
                      href={item.href}
                      key={item.id}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  ))}
                  <div className="-mx-1 my-1 h-px bg-border" />
                  <NavigationMenuLink
                    className={navLinkClass("contact", activeSection)}
                    href={ROUTES.CONTACT}
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
