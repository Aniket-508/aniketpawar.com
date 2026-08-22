import { ArrowUpRightIcon } from "lucide-react";

import { AppLink } from "@/components/ui/app-link";
import { Button } from "@/components/ui/button";
import type { Section } from "@/lib/events";
import { cn } from "@/lib/utils";

export const ViewAllButton = ({
  href,
  eventName,
  className,
}: {
  href: string;
  eventName: Section;
  className?: string;
}) => (
  <Button
    variant="secondary"
    className={cn("group", className)}
    nativeButton={false}
    render={
      <AppLink
        href={href}
        eventName="view_all_click"
        eventProperties={{ section: eventName }}
      />
    }
  >
    View all
    <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:rotate-45" />
  </Button>
);
