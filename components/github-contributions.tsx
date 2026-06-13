"use client";

import { format } from "date-fns";
import { use } from "react";

import type { Activity } from "@/components/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/contribution-graph";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const GitHubContributions = ({
  contributions,
  githubProfileUrl,
  className,
}: {
  contributions: Promise<Activity[]>;
  githubProfileUrl: string;
  className?: string;
}) => {
  const data = use(contributions);

  return (
    <div className={cn("rounded-sm bg-background", className)}>
      <ContributionGraph
        className="px-2 py-3"
        data={data}
        blockSize={11}
        blockMargin={3}
        blockRadius={2}
      >
        <ContributionGraphCalendar
          className="no-scrollbar px-2"
          title="GitHub Contributions"
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger render={<g />}>
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                />
              </TooltipTrigger>
              <TooltipContent className="font-sans">
                <p>
                  {activity.count} contribution{activity.count > 1 ? "s" : null}{" "}
                  on {format(new Date(activity.date), "dd.MM.yyyy")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="px-2">
          <ContributionGraphTotalCount>
            {({ totalCount, year }) => (
              <div className="text-muted-foreground">
                {totalCount.toLocaleString("en")} contributions in {year}
              </div>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend />
        </ContributionGraphFooter>
      </ContributionGraph>
    </div>
  );
};

export const GitHubContributionsFallback = () => (
  <div className="flex h-40.5 w-full items-center justify-center">
    <Spinner className="text-muted-foreground" />
  </div>
);
