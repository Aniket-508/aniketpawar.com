import { AppLink } from "@/components/ui/app-link";
import { Section } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import { EXPERIENCES } from "@/constants/experiences";
import { LINK } from "@/constants/links";
import { ROUTES } from "@/constants/routes";
import { BreadcrumbJsonLd } from "@/seo/json-ld";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  canonical: ROUTES.ABOUT,
  description:
    "About Aniket Pawar — Frontend engineer based in Mumbai, India. Building fast, polished, human-centric products with React, Next.js, and modern web technologies.",
  title: "About",
});

const AboutPage = () => (
  <>
    <BreadcrumbJsonLd
      items={[
        { name: "Home", path: ROUTES.HOME },
        { name: "About", path: ROUTES.ABOUT },
      ]}
    />
    <header className="animate-slide-in space-y-2 px-4 pt-6 pb-2">
      <Title className="text-xl font-medium italic">{"about."}</Title>
    </header>
    <Section className="delay-100 prose text-muted-foreground prose-p:my-2 dark:prose-invert max-w-full px-4 text-sm leading-6 font-normal">
      <p>
        I&apos;m Aniket Pawar, a frontend engineer based in Mumbai, India. I
        care deeply about visual craft and obsess over building products that
        feel fast, polished, and human.
      </p>
      <p>
        I currently work as a Frontend Engineer at{" "}
        <AppLink href={EXPERIENCES[0].experienceOrg.link} target="_blank">
          {EXPERIENCES[0].experienceOrg.name}
        </AppLink>
        , where I build institutional-grade trading infrastructure — dashboards,
        real-time market data, and AI-assisted workflows.
      </p>
      <p>
        Previously, I was an SDE-2 at{" "}
        <AppLink href={EXPERIENCES[1].experienceOrg.link} target="_blank">
          {EXPERIENCES[1].experienceOrg.name}
        </AppLink>
        , where I built recruitment automation tools, React Native apps, and
        contributed to two ProductHunt launches.
      </p>
      <p>
        I run{" "}
        <AppLink href={LINK.SHADCN_LABS} target="_blank">
          Shadcn Labs
        </AppLink>
        , an open-source organization committed to building technologies that
        push the limits of the{" "}
        <AppLink href={LINK.SHADCN_UI} target="_blank">
          shadcn/ui
        </AppLink>{" "}
        ecosystem. I also maintain a{" "}
        <AppLink href={LINK.GITHUB_REPO} target="_blank">
          shadcn/ui component registry
        </AppLink>{" "}
        with reusable, production-ready components.
      </p>
      <h2>What I Do</h2>
      <ul>
        <li>
          Frontend engineering with React, Next.js, Vue.js, and TypeScript
        </li>
        <li>Design system development and component library architecture</li>
        <li>Open-source tooling for the shadcn/ui ecosystem</li>
        <li>Performance optimization and developer experience improvement</li>
        <li>UI/UX design with a focus on accessibility and craft</li>
      </ul>
      <h2>Tech Stack</h2>
      <p>
        My primary tools include React, Next.js, TypeScript, Tailwind CSS,
        Vue.js, Nuxt.js, Node.js, and various cloud platforms (AWS, GCP,
        Vercel). I&apos;m passionate about building design systems,
        micro-frontends, and performant web applications.
      </p>
      <h2>Get in Touch</h2>
      <p>
        Interested in working together? Reach out via{" "}
        <AppLink href={`mailto:${LINK.EMAIL}`}>email</AppLink>, schedule a call
        on{" "}
        <AppLink href={LINK.CALENDLY} target="_blank">
          Cal.com
        </AppLink>
        , or connect with me on{" "}
        <AppLink href={LINK.LINKEDIN} target="_blank">
          LinkedIn
        </AppLink>
        .
      </p>
    </Section>
  </>
);

export default AboutPage;
