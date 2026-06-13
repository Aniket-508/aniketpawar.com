import { CalendarClockIcon } from "lucide-react";
import { Suspense } from "react";

import { CopyLink } from "@/components/copy-link";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
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
        <Title>{"about me."}</Title>
        <CopyLink
          title={"About"}
          className="hidden group-hover/about:inline-flex"
        />
      </span>
      <div className="prose text-muted-foreground dark:prose-invert max-w-full text-sm leading-6 font-normal">
        <p>
          Hey there! I&apos;m a software professional who is passionate about
          building customer-focused, design-centric products that prioritize
          inclusivity and seamless user experiences.
        </p>
        <p>
          In my free time, I enjoy{" "}
          <AppLink
            href="#projects"
            eventName="internal_link_click"
            eventProperties={{
              href: "#projects",
              label: "building side projects",
            }}
          >
            building side projects
          </AppLink>
          , exploring new products via. [
          <AppLink
            href="https://www.producthunt.com/"
            target="_blank"
            eventName="external_link_click"
            eventProperties={{
              context: "hero",
              link_type: "external",
              title: "product hunt",
              url: "https://www.producthunt.com/",
            }}
          >
            product hunt
          </AppLink>
          ,{" "}
          <AppLink
            href="https://peerlist.io/projects"
            target="_blank"
            eventName="external_link_click"
            eventProperties={{
              context: "hero",
              link_type: "external",
              title: "peerlist spotlight",
              url: "https://peerlist.io/projects",
            }}
          >
            peerlist spotlight
          </AppLink>
          ,{" "}
          <AppLink
            href="https://fazier.com/"
            target="_blank"
            eventName="external_link_click"
            eventProperties={{
              context: "hero",
              link_type: "external",
              title: "fazier",
              url: "https://fazier.com/",
            }}
          >
            fazier
          </AppLink>
          ], checking out what&apos;s happening in the startup world via. [
          <AppLink
            href="https://techcrunch.com/"
            target="_blank"
            eventName="external_link_click"
            eventProperties={{
              context: "hero",
              link_type: "external",
              title: "techcrunch",
              url: "https://techcrunch.com/",
            }}
          >
            techcrunch
          </AppLink>
          ,{" "}
          <AppLink
            href="https://news.ycombinator.com/"
            target="_blank"
            eventName="external_link_click"
            eventProperties={{
              context: "hero",
              link_type: "external",
              title: "hackernews",
              url: "https://news.ycombinator.com/",
            }}
          >
            hackernews
          </AppLink>
          ,{" "}
          <AppLink
            href="https://inc42.com/"
            target="_blank"
            eventName="external_link_click"
            eventProperties={{
              context: "hero",
              link_type: "external",
              title: "inc42",
              url: "https://inc42.com/",
            }}
          >
            inc42
          </AppLink>
          ], and watching my favourite animes.
        </p>
      </div>
      <Callout className="space-y-1 p-1">
        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions
            contributions={contributions}
            githubProfileUrl={LINK.GITHUB}
          />
        </Suspense>
        <div className="flex flex-col gap-4 p-3">
          <p>Interested in working together? Feel free to schedule a meet!</p>
          <div className="flex flex-row items-center gap-4">
            <Button
              size="lg"
              className="gap-1"
              nativeButton={false}
              render={
                <AppLink
                  href={LINK.CALENDLY}
                  target="_blank"
                  eventName="schedule_meet_click"
                />
              }
            >
              Schedule a meet /{" "}
              <CalendarClockIcon className="inline sm:hidden" />
              <span className="hidden sm:inline">cal.com</span>
            </Button>
            <AppLink
              href={LINK.RESUME}
              target="_blank"
              className="text-muted-foreground text-sm font-medium"
              eventName="resume_click"
              eventProperties={{ location: "work_together" }}
            >
              Resume
            </AppLink>
          </div>
        </div>
      </Callout>
    </Section>
  );
};

export { AboutSection };
