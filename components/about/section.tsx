import { CalendarDaysIcon, MailIcon } from "lucide-react";
import { Suspense } from "react";

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/about/github-contributions";
import { CopyLink } from "@/components/copy-link";
import { Icons } from "@/components/icons";
import { Section } from "@/components/layout/section";
import { AppLink } from "@/components/ui/app-link";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Title } from "@/components/ui/title";
import { LINK } from "@/constants/links";
import { getGitHubContributions } from "@/lib/github";

const AboutSection = () => {
  const contributions = getGitHubContributions();
  return (
    <Section id="about" className="delay-100 space-y-4">
      <span className="group/about flex items-center gap-1">
        <Title
          className="text-xl font-medium italic"
          render={<h2>{"about me."}</h2>}
        />
        <CopyLink
          title={"About"}
          className="hidden group-hover/about:inline-flex"
        />
      </span>
      <div className="prose text-muted-foreground prose-p:my-2 dark:prose-invert max-w-full text-sm leading-6 font-normal">
        <p>I&apos;m a frontend engineer based in Mumbai, India.</p>
        <p>
          I care deeply about visual craft and obsess over building products
          that feel fast, polished, and human.
        </p>
        <p>
          I run{" "}
          <AppLink
            className="inline-flex items-center gap-1 translate-y-[3px]"
            href={LINK.GITHUB_ORG}
            target="_blank"
            eventName="external_link_click"
            eventProperties={{
              context: "hero",
              link_type: "external",
              title: "shadcn labs",
              url: LINK.GITHUB_ORG,
            }}
          >
            <Icons.shadcnlabs className="size-4" /> Shadcn Labs
          </AppLink>
          , an open-source org committed to building technologies that push the
          limits of{" "}
          <AppLink
            href={LINK.SHADCN_UI}
            target="_blank"
            eventName="external_link_click"
            eventProperties={{
              context: "hero",
              link_type: "external",
              title: "shadcn/ui",
              url: LINK.SHADCN_UI,
            }}
          >
            shadcn/ui
          </AppLink>{" "}
          ecosystem.
        </p>
      </div>
      <Callout className="space-y-1 p-1">
        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions contributions={contributions} />
        </Suspense>
        <div className="flex flex-col gap-3 p-2">
          <p>
            Interested in working together? Check out my{" "}
            <AppLink
              href={LINK.RESUME}
              target="_blank"
              className="text-muted-foreground text-sm font-medium inline-flex min-w-[69px]"
              external
              eventName="resume_click"
              eventProperties={{ location: "work_together" }}
            >
              Resume
            </AppLink>
          </p>
          <div className="flex flex-row items-center gap-2">
            <Button
              nativeButton={false}
              render={
                <AppLink
                  href={LINK.CALENDLY}
                  target="_blank"
                  eventName="schedule_meet_click"
                />
              }
            >
              <CalendarDaysIcon />
              Book an intro call
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <AppLink
                  href={LINK.EMAIL}
                  target="_blank"
                  eventName="send_email_click"
                />
              }
            >
              <MailIcon />
              Send an email
            </Button>
          </div>
        </div>
      </Callout>
    </Section>
  );
};

export { AboutSection };
