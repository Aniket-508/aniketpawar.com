"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ModeToggle } from "@/components/mode-toggle";
import { NavItemGitHub } from "@/components/nav-item-github";
import { SoundToggle } from "@/components/sound-toggle";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { trackNavbarHomeClick, trackNavbarSectionClick } from "@/lib/events";
import { cn } from "@/lib/utils";

export type { PathItem } from "@/types/navigation";

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

const Navbar = () => {
  const pathname = usePathname();
  const activeSection = getActiveSection(pathname);

  if (!activeSection) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between gap-4 px-4 py-6">
      <div className="flex items-center gap-4">
        <Link
          href={ROUTES.HOME}
          aria-label="Home"
          onClick={trackNavbarHomeClick}
        >
          <Image
            src={SITE.AUTHOR.AVATAR}
            alt="Aniket Pawar"
            width={36}
            height={36}
            className="rounded-full"
            priority
          />
        </Link>

        <ul className="flex items-center gap-4">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <Link
                href={section.href}
                className={cn(
                  "text-sm transition-colors",
                  activeSection === section.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() =>
                  trackNavbarSectionClick(
                    section.id === "experiences" ? "experience" : section.id
                  )
                }
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2">
        <NavItemGitHub />
        <SoundToggle />
        <ModeToggle />
      </div>
    </nav>
  );
};

export { Navbar };
