import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { NavItemGitHub } from "@/components/nav-item-github";
import { SoundToggle } from "@/components/sound-toggle";

const Navbar = () => (
  <header className="view-container animate-slide-in slide-in-from-top-10 relative flex items-center justify-between gap-4 px-4 pt-10">
    <MainNav />

    <div className="flex items-center gap-1">
      <NavItemGitHub />
      <SoundToggle />
      <ModeToggle />
    </div>
  </header>
);

export { Navbar };
