import Link from "next/link"

import { CopyLink } from "../CopyLink"
import Section from "../layout/Section"
import Title from "../ui/Title"
import Header from "./Header"

const HeroSection: React.FunctionComponent = () => {
  return (
    <Section id="about" className="animation-delay-300">
      <span className="group/about flex items-center space-x-2">
        <Title>{"about me."}</Title>
        <CopyLink
          title={"About"}
          className="hidden size-4 group-hover/about:inline"
        />
      </span>
      <div className="prose mt-4 max-w-full text-sm font-normal leading-6 text-muted-foreground dark:prose-invert">
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
          , contributing to various projects that enhanced my coding skills and
          strengthened my problem-solving abilities.
        </p>
        <p>
          In my free time, I enjoy{" "}
          <Link href={"#projects"}>building side projects</Link>, exploring new
          products via. [
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
    </Section>
  )
}

export default HeroSection
