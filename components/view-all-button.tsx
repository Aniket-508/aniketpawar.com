import { ArrowUpRightIcon } from "lucide-react";

import { AppLink } from "@/components/ui/app-link";
import { Button } from "@/components/ui/button";
import type { Section } from "@/lib/events";

export const ViewAllButton = ({
  href,
  eventName,
}: {
  href: string;
  eventName: Section;
}) => (
  <Button
    variant="secondary"
    className="group col-span-2"
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
