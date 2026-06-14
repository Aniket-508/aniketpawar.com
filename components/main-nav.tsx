"use client";

import { usePathname } from "next/navigation";

import { AppLink } from "@/components/ui/app-link";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    href: ROUTES.PROJECTS,
    id: "projects",
    label: "projects",
  },
  {
    href: ROUTES.CRAFTS,
    id: "crafts",
    label: "crafts",
  },
  {
    href: ROUTES.EXPERIENCES,
    id: "experiences",
    label: "experience",
  },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const getActiveSection = (pathname: string): SectionId | null => {
  if (
    pathname === ROUTES.PROJECTS ||
    pathname.startsWith(`${ROUTES.PROJECTS}/`)
  ) {
    return "projects";
  }

  if (pathname === ROUTES.CRAFTS || pathname.startsWith(`${ROUTES.CRAFTS}/`)) {
    return "crafts";
  }

  if (
    pathname === ROUTES.EXPERIENCES ||
    pathname.startsWith(`${ROUTES.EXPERIENCES}/`)
  ) {
    return "experiences";
  }

  return null;
};

const MainNav = () => {
  const pathname = usePathname();
  const activeSection = getActiveSection(pathname);

  return (
    <ul className="flex items-center gap-4">
      {SECTIONS.map((section) => (
        <li key={section.id}>
          <AppLink
            href={section.href}
            className={cn(
              "text-sm transition-colors",
              activeSection === section.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            eventName="navbar_section_click"
            eventProperties={{
              section: section.id === "experiences" ? "experience" : section.id,
            }}
          >
            {section.label}
          </AppLink>
        </li>
      ))}
    </ul>
  );
};

export { MainNav };
