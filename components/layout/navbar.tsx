import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { NavItemGitHub } from "@/components/nav-item-github";
import { SoundToggle } from "@/components/sound-toggle";

const Navbar = () => (
  <header className="view-container relative flex items-center justify-between gap-4 px-4 py-6">
    <MainNav />

    <div className="absolute top-7 right-4 flex items-center gap-1">
      <NavItemGitHub />
      <SoundToggle />
      <ModeToggle />
    </div>
  </header>
);

export { Navbar };
