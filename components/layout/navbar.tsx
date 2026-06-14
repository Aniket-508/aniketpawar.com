import Image from "next/image";

import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { NavItemGitHub } from "@/components/nav-item-github";
import { SoundToggle } from "@/components/sound-toggle";
import { AppLink } from "@/components/ui/app-link";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

const Navbar = () => (
  <nav className="flex items-center justify-between gap-4 px-4 py-6">
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

      <MainNav />
    </div>

    <div className="flex items-center gap-1">
      <NavItemGitHub />
      <SoundToggle />
      <ModeToggle />
    </div>
  </nav>
);

export { Navbar };
