"use client";

import { usePathname } from "next/navigation";

import { AppLink } from "@/components/ui/app-link";
import { NAV_ITEMS } from "@/constants/site";
import { getActiveSection } from "@/lib/nav";
import { cn } from "@/lib/utils";

const MainNav = () => {
  const pathname = usePathname();
  const activeSection = getActiveSection(pathname);

  return (
    <ul className="hidden sm:flex items-center gap-4">
      {NAV_ITEMS.map(({ href, id, label }) => (
        <li key={id}>
          <AppLink
            href={href}
            className={cn(
              "text-sm transition-colors",
              activeSection === id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            eventName="navbar_section_click"
            eventProperties={{
              section: id === "experiences" ? "experience" : id,
            }}
          >
            {label}
          </AppLink>
        </li>
      ))}
    </ul>
  );
};

export { MainNav };
