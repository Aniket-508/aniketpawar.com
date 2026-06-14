import { Section } from "@/components/layout/section";
import { ModeToggle } from "@/components/mode-toggle";
import { NavItemGitHub } from "@/components/nav-item-github";
import { SoundToggle } from "@/components/sound-toggle";
import { UserAvatar } from "@/components/user-avatar";

const HeaderSection = () => (
  <Section
    id="profile"
    className="flex flex-row items-center justify-start gap-5 pb-6 max-sm:items-start"
  >
    <UserAvatar />
    <div className="flex flex-1 items-start justify-between">
      <div>
        <h1 className="text-primary text-2xl leading-snug font-semibold tracking-tighter">
          Aniket Pawar
        </h1>
        <div className="text-muted-foreground mt-1 text-base leading-snug font-normal">
          <p>Frontend Engineer</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <NavItemGitHub />
        <SoundToggle />
        <ModeToggle />
      </div>
    </div>
  </Section>
);

export { HeaderSection };
