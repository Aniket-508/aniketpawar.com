"use client";

import { usePathname } from "next/navigation";

import { MoreNavMenu } from "@/components/more-nav-menu";
import { AppLink } from "@/components/ui/app-link";
import { NAV_ITEMS } from "@/constants/site";
import { getActiveSection } from "@/lib/nav";
import { cn } from "@/lib/utils";

const allMoreItems = NAV_ITEMS.filter((item) => item.id !== "home");

const craftsExpItems = allMoreItems.filter((item) => item.id !== "projects");

const expItems = allMoreItems.filter(
  (item) => item.id !== "projects" && item.id !== "crafts"
);

const extrasItems = allMoreItems.filter((item) =>
  ["stack", "favorites"].includes(item.id)
);

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
    <div className="flex items-center gap-4">
      <nav className="flex items-center gap-4">
        <AppLink
          href="/"
          className={navLinkClass("home")}
          eventName="navbar_section_click"
          eventProperties={{ section: "home" }}
        >
          home
        </AppLink>

        <AppLink
          href="/projects"
          className={cn(navLinkClass("projects"), "hidden xs:inline-flex")}
          eventName="navbar_section_click"
          eventProperties={{ section: "projects" }}
        >
          projects
        </AppLink>

        <AppLink
          href="/crafts"
          className={cn(navLinkClass("crafts"), "hidden sm:inline-flex")}
          eventName="navbar_section_click"
          eventProperties={{ section: "crafts" }}
        >
          crafts
        </AppLink>

        <AppLink
          href="/experiences"
          className={cn(navLinkClass("experiences"), "hidden md:inline-flex")}
          eventName="navbar_section_click"
          eventProperties={{ section: "experiences" }}
        >
          experience
        </AppLink>

        <MoreNavMenu
          items={allMoreItems}
          groupLabel="extras"
          activeSection={activeSection}
          className="xs:hidden"
        />

        <MoreNavMenu
          items={craftsExpItems}
          groupLabel="extras"
          activeSection={activeSection}
          className="hidden xs:flex sm:hidden"
        />

        <MoreNavMenu
          items={expItems}
          groupLabel="extras"
          activeSection={activeSection}
          className="hidden sm:flex md:hidden"
        />

        <MoreNavMenu
          items={extrasItems}
          groupLabel="extras"
          activeSection={activeSection}
          className="hidden md:flex"
        />
      </nav>
    </div>
  );
};

export { MainNav };
