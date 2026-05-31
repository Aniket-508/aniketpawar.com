import { LayoutGridIcon, TextAlignJustifyIcon } from "lucide-react";

import { CopyLink } from "@/components/copy-link";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";

const CraftSection = () => (
  <Section
    className="animation-delay-700 grid grid-cols-1 justify-start gap-8"
    id="crafts"
  >
    <div className="flex items-center justify-between gap-4">
      <div className="group/projects flex items-center gap-2">
        <Title>{"crafts."}</Title>
        <CopyLink
          title={"Crafts"}
          className="hidden size-4 group-hover/projects:inline"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <TextAlignJustifyIcon />
        </Button>
        <Button variant="ghost" size="icon">
          <LayoutGridIcon />
        </Button>
      </div>
    </div>
    {/* {getProjects()?.map((project: ProjectItemProps, projectIndex: number) => (
      <ProjectItem {...project} key={projectIndex} />
    ))} */}
  </Section>
);

export { CraftSection };
