"use client";

import Link from "next/link";
import Section from "../layout/Section";
import LinkText from "../ui/LinkText";
import Title from "../ui/Title";
import Callout from "./Callout";
import Header from "./Header";
import { Button } from "../ui/Button";
import { CalendarClockIcon } from "lucide-react";

const HeroSection: React.FunctionComponent = () => {
  return (
    <main id="hero">
      <Header />
      <Section className="border-b">
        <Title>{"about me."}</Title>
        <div className="prose leading-6 text-sm font-normal text-muted-foreground dark:prose-invert mt-4 max-w-full">
          <p>
            Hey there! I&apos;m a software professional who is passionate about
            building customer-focused, design-centric products that prioritize
            inclusivity and seamless user experiences.
          </p>
          <p>
            In the past, I completed my undergrad in{" "}
            <Link
              href={"https://vesit.ves.ac.in/departments/cmpn/deptreport"}
              target="_blank"
            >
              computer engineering from vesit
            </Link>{" "}
            . While juggling with academics, I actively participated in{" "}
            <Link href={"https://github.com/Aniket-508"} target="_blank">
              open-source programs
            </Link>{" "}
            , contributing to various projects that enhanced my coding skills
            and strengthened my problem-solving abilities.
          </p>
          <p>
            In my free time, I enjoy{" "}
            <Link href={"#projects"}>building side projects</Link>, exploring
            new products via. [
            <Link href={"https://www.producthunt.com/"} target="_blank">
              product hunt
            </Link>
            ,{" "}
            <Link href={"https://peerlist.io/projects"} target="_blank">
              peerlist spotlight
            </Link>
            ,{" "}
            <Link href={"https://fazier.com/"} target="_blank">
              fazier
            </Link>
            ], checking out what&apos;s happening in the startup world via. [
            <Link href={"https://techcrunch.com/"} target="_blank">
              techcrunch
            </Link>
            ,{" "}
            <Link href={"https://news.ycombinator.com/"} target="_blank">
              hackernews
            </Link>
            ,{" "}
            <Link href={"https://inc42.com/"} target="_blank">
              inc42
            </Link>
            ], and watching my favourite animes.
          </p>
        </div>
        <Callout className="mt-4 space-y-4">
          <p>
            {"Interested in working together? Feel free to schedule a meet!"}
          </p>
          <div className="flex flex-row items-center justify-start gap-4">
            <Button asChild className="gap-1">
              <Link href="https://cal.com/aniket-pawar" target="_blank">
                Schedule a meet /{" "}
                <CalendarClockIcon className="inline sm:hidden" />
                <span className="hidden sm:inline">cal.com</span>
              </Link>
            </Button>
            <LinkText
              href={"/resume.pdf"}
              className="text-muted-foreground font-medium text-sm"
              preview={false}
            >
              {"Resume"}
            </LinkText>
          </div>
        </Callout>
      </Section>
    </main>
  );
};

export default HeroSection;
