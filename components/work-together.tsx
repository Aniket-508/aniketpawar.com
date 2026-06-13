"use client";

import { CalendarClockIcon } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { LinkTextClient } from "@/components/ui/link-text/client";
import { trackResumeClick, trackScheduleMeetClick } from "@/lib/events";

const WorkTogether = () => (
  <Section id="work-together" className="delay-200">
    <Callout className="space-y-4">
      <p>{"Interested in working together? Feel free to schedule a meet!"}</p>
      <div className="flex flex-row items-center justify-start gap-4">
        <Button
          size="lg"
          className="gap-1"
          nativeButton={false}
          render={
            <Link
              href="https://cal.com/aniket-pawar"
              target="_blank"
              onClick={trackScheduleMeetClick}
            />
          }
        >
          Schedule a meet / <CalendarClockIcon className="inline sm:hidden" />
          <span className="hidden sm:inline">cal.com</span>
        </Button>
        <LinkTextClient
          href={"/resume.pdf"}
          target="_blank"
          className="text-muted-foreground text-sm font-medium"
          onClick={() => trackResumeClick("work_together")}
        >
          {"Resume"}
        </LinkTextClient>
      </div>
    </Callout>
  </Section>
);

export { WorkTogether };
