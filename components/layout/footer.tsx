// import { HapticsToggle } from "@/components/haptics-toggle";
import { ModeToggle } from "@/components/mode-toggle";
// import { SoundToggle } from "@/components/sound-toggle";

const Footer = () => (
  <footer className="mt-auto animate-slide-in delay-700 mx-auto w-full max-w-screen-sm border-t px-4">
    <div className="flex items-center justify-between py-2">
      <p className="text-muted-foreground text-xs">
        &copy; {new Date().getFullYear()} <span>Aniket Pawar</span>
      </p>
      <div className="flex items-center gap-2">
        {/* <HapticsToggle />
        <SoundToggle /> */}
        <ModeToggle />
      </div>
    </div>
  </footer>
);

export { Footer };
