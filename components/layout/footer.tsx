import { HapticsToggle } from "@/components/haptics-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { SoundToggle } from "@/components/sound-toggle";

const Footer: React.FC = () => (
  <footer className="animate-in fade-in fill-mode-both animation-delay-1300 mx-auto w-full max-w-screen-sm border-t px-4 duration-1000">
    <div className="flex items-center justify-between py-3">
      <p className="text-muted-foreground text-xs">
        &copy; {new Date().getFullYear()} <span>Aniket Pawar</span>
      </p>
      <div className="flex items-center gap-2">
        <HapticsToggle />
        <SoundToggle />
        <ModeToggle />
      </div>
    </div>
  </footer>
);

export default Footer;
