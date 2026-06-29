import { Icons } from "@/components/icons";
import { AppLink } from "@/components/ui/app-link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LINK } from "@/constants/links";
import { getStargazerCount } from "@/lib/github";

const NavItemGitHub = async () => {
  const stargazerCount = await getStargazerCount();

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          size="icon-sm"
          variant="ghost"
          nativeButton={false}
          render={
            <AppLink
              href={LINK.GITHUB_REPO}
              target="_blank"
              rel="noreferrer"
              eventName="external_link_click"
              eventProperties={{
                context: "github_link",
                link_type: "github",
                title: "site repo",
                url: LINK.GITHUB_REPO,
              }}
            />
          }
        >
          <Icons.github />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {new Intl.NumberFormat("en-US").format(stargazerCount)} stars
      </TooltipContent>
    </Tooltip>
  );
};

export { NavItemGitHub };
