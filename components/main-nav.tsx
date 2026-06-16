"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { AppLink } from "@/components/ui/app-link";
import { UserAvatar } from "@/components/user-avatar";
import { ROUTES } from "@/constants/routes";
import { NAV_ITEMS, SITE } from "@/constants/site";
import { getActiveSection } from "@/lib/nav";
import { cn } from "@/lib/utils";

import { Title } from "./ui/title";

const MainNav = () => {
  const pathname = usePathname();
  const isHome = pathname === ROUTES.HOME;
  const activeSection = getActiveSection(pathname);

  if (isHome) {
    return (
      <div className="flex items-center gap-5">
        <UserAvatar />
        <div>
          <Title className="font-sans tracking-tight">Aniket Pawar</Title>
          <p className="text-muted-foreground mt-1 text-base leading-snug font-normal">
            Frontend Engineer
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <AppLink
        href={ROUTES.HOME}
        aria-label="Home"
        eventName="navbar_home_click"
      >
        <Image
          src={SITE.AUTHOR.AVATAR}
          alt="Aniket Pawar"
          width={36}
          height={36}
          className="rounded-full"
          priority
        />
      </AppLink>

      <nav className="hidden sm:flex items-center gap-4">
        {NAV_ITEMS.map(({ href, id, label }) => (
          <AppLink
            key={id}
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
        ))}
      </nav>
    </div>
  );
};

export { MainNav };
