import { CopyLink } from "@/components/copy-link";
import { Section } from "@/components/layout/section";
import { Title } from "@/components/ui/title";
import { ASSETS, LINK } from "@/constants/links";

const TOKSCALE_USERNAME = "Aniket-508";

const StatsTokens = () => (
  <Section className="delay-200 space-y-4 py-4">
    <div className="space-y-1.5">
      <span className="group/analytics flex items-center gap-1">
        <Title
          className="font-sans text-base font-normal"
          render={<h2>{"AI Token Usage"}</h2>}
        />
        <CopyLink
          title="AI Token Usage"
          className="opacity-0 transition-opacity group-hover/analytics:opacity-100"
        />
      </span>
      <p className="text-muted-foreground text-sm">
        How many tokens I{" "}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSETS.FIRE}
          alt="fire"
          className="inline-block size-4 -translate-y-1"
        />{" "}
        through building things with AI coding agents. Synced from{" "}
        <a
          href={LINK.TOKSCALE}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Tokscale
        </a>
        .
      </p>
    </div>

    <div>
      <iframe
        src={`https://tokscale.ai/u/${TOKSCALE_USERNAME}?theme=dark`}
        className="w-full h-[800px] rounded-md border bg-background"
        title="Tokscale Token Usage"
      />
    </div>
  </Section>
);

export { StatsTokens };
