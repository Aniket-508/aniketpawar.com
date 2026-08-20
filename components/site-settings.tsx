"use client";

import { SettingsIcon } from "lucide-react";
import { useState } from "react";

import { GridModeSwitcher } from "@/components/grid-mode-switcher";
import { ModeSwitcher } from "@/components/mode-switcher";
import { SoundSwitcher } from "@/components/sound-switcher";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGridModeToggle } from "@/hooks/use-grid-mode-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSoundToggle } from "@/hooks/use-sound-toggle";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

export const SiteSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useThemeToggle();
  useSoundToggle();
  useGridModeToggle();

  const trigger = (
    <Button
      variant="ghost"
      size="icon-sm"
      className="group/settings"
      aria-label="Settings"
    >
      <SettingsIcon />
    </Button>
  );

  const content = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-12 text-sm">Theme</span>
          {!isMobile && <Kbd>D</Kbd>}
        </div>
        <ModeSwitcher />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-12 text-sm">Sound</span>
          {!isMobile && <Kbd>S</Kbd>}
        </div>
        <SoundSwitcher />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-12 text-sm">Borders</span>
          {!isMobile && <Kbd>B</Kbd>}
        </div>
        <GridModeSwitcher />
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger render={trigger} />
          <SheetContent side="bottom" hideClose>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>Manage site preferences</SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-4">{content}</div>
            <div className="p-4 pt-0">
              <SheetClose render={<Button className="w-full" />}>
                Done
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger render={trigger} />
          <PopoverContent className="w-56">{content}</PopoverContent>
        </Popover>
      )}
    </>
  );
};
