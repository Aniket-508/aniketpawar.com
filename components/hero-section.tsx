"use client";

import Link from "next/link";

import { CopyLink } from "@/components/copy-link";
import { Section } from "@/components/layout/section";
import { Title } from "@/components/ui/title";
import { trackExternalLinkClick, trackInternalLinkClick } from "@/lib/events";

const trackHeroExternalLink = (title: string, url: string) => {
  trackExternalLinkClick({
    context: "hero",
    link_type: "external",
    title,
    url,
  });
};

const HeroSection = () => (
  <Section id="about" className="delay-100 space-y-4">
    <span className="group/about flex items-center space-x-2">
      <Title>{"about me."}</Title>
      <CopyLink
        title={"About"}
        className="hidden size-4 group-hover/about:inline"
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
        <Link
          href={"#projects"}
          onClick={() =>
            trackInternalLinkClick("#projects", "building side projects")
          }
        >
          building side projects
        </Link>
        , exploring new products via. [
        <Link
          href={"https://www.producthunt.com/"}
          target="_blank"
          onClick={() =>
            trackHeroExternalLink(
              "product hunt",
              "https://www.producthunt.com/"
            )
          }
        >
          product hunt
        </Link>
        ,{" "}
        <Link
          href={"https://peerlist.io/projects"}
          target="_blank"
          onClick={() =>
            trackHeroExternalLink(
              "peerlist spotlight",
              "https://peerlist.io/projects"
            )
          }
        >
          peerlist spotlight
        </Link>
        ,{" "}
        <Link
          href={"https://fazier.com/"}
          target="_blank"
          onClick={() => trackHeroExternalLink("fazier", "https://fazier.com/")}
        >
          fazier
        </Link>
        ], checking out what&apos;s happening in the startup world via. [
        <Link
          href={"https://techcrunch.com/"}
          target="_blank"
          onClick={() =>
            trackHeroExternalLink("techcrunch", "https://techcrunch.com/")
          }
        >
          techcrunch
        </Link>
        ,{" "}
        <Link
          href={"https://news.ycombinator.com/"}
          target="_blank"
          onClick={() =>
            trackHeroExternalLink("hackernews", "https://news.ycombinator.com/")
          }
        >
          hackernews
        </Link>
        ,{" "}
        <Link
          href={"https://inc42.com/"}
          target="_blank"
          onClick={() => trackHeroExternalLink("inc42", "https://inc42.com/")}
        >
          inc42
        </Link>
        ], and watching my favourite animes.
      </p>
    </div>
  </Section>
);

export { HeroSection };
