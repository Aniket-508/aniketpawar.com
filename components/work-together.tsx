import { CalendarClockIcon } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { LinkText } from "@/components/ui/link-text";

const WorkTogether = () => (
  <Section id="work-together" className="delay-200">
    <Callout className="space-y-4">
      <p>{"Interested in working together? Feel free to schedule a meet!"}</p>
      <div className="flex flex-row items-center justify-start gap-4">
        <Button size="lg" asChild className="gap-1">
          <Link href="https://cal.com/aniket-pawar" target="_blank">
            Schedule a meet / <CalendarClockIcon className="inline sm:hidden" />
            <span className="hidden sm:inline">cal.com</span>
          </Link>
        </Button>
        <LinkText
          href={"/resume.pdf"}
          target="_blank"
          className="text-muted-foreground text-sm font-medium"
          preview={false}
        >
          {"Resume"}
        </LinkText>
      </div>
    </Callout>
  </Section>
);

export { WorkTogether };
