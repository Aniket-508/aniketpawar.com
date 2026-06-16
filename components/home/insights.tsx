import { format } from "date-fns";

import { Grid } from "@/components/charts/grid";
import { Line } from "@/components/charts/line";
import { LineChart } from "@/components/charts/line-chart";
import { ChartTooltip } from "@/components/charts/tooltip";
import { CopyLink } from "@/components/copy-link";
import { Section } from "@/components/layout/section";
import { Callout } from "@/components/ui/callout";
import { Title } from "@/components/ui/title";
import { getClarityInsights } from "@/lib/clarity";
import { cn } from "@/lib/utils";

const Metric = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex flex-col gap-1 p-3 bg-background rounded-md",
      className
    )}
    {...props}
  />
);

const MetricLabel = ({ className, ...props }: React.ComponentProps<"dt">) => (
  <dt className={cn("text-xs text-muted-foreground", className)} {...props} />
);

const MetricValue = ({ className, ...props }: React.ComponentProps<"dd">) => (
  <dd
    className={cn("text-lg font-semibold tabular-nums", className)}
    {...props}
  />
);

const InsightsSection = async () => {
  const data = await getClarityInsights();

  if (!data) {
    return null;
  }

  return (
    <Section id="insights" className="delay-300 space-y-4">
      <span className="group/insights flex items-center gap-1">
        <Title
          className="text-xl font-medium italic"
          render={<h2>{"insights."}</h2>}
        />
        <CopyLink
          title="Insights"
          className="hidden group-hover/insights:inline-flex"
        />
      </span>

      <div className="space-y-2 py-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Last visit from{" "}
            <span className="font-medium text-foreground">
              {data.topCountry}
            </span>
          </span>
          <span>
            {format(new Date(data.startDate), "dd MMM")} –{" "}
            {format(new Date(data.endDate), "dd MMM yyyy")}
          </span>
        </div>

        <Callout className="p-1 space-y-1">
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            <Metric>
              <MetricLabel>Unique Visitors</MetricLabel>
              <MetricValue>
                {(data.summary.uniqueVisitors ?? 0).toLocaleString()}
              </MetricValue>
            </Metric>
            <Metric>
              <MetricLabel>Sessions</MetricLabel>
              <MetricValue>
                {(data.summary.totalSessions ?? 0).toLocaleString()}
              </MetricValue>
            </Metric>
            <Metric>
              <MetricLabel>Pages / Session</MetricLabel>
              <MetricValue>{data.summary.pagesPerSession ?? 0}</MetricValue>
            </Metric>
          </dl>

          {data.series.length > 0 && (
            <div className="bg-background p-3 rounded-md">
              <LineChart
                data={data.series as unknown as Record<string, unknown>[]}
                xDataKey="date"
                aspectRatio="2 / 1"
                margin={{ bottom: 40, left: 20, right: 20, top: 20 }}
              >
                <Grid horizontal strokeDasharray="3,3" />
                <Line
                  dataKey="total_sessions"
                  stroke="var(--chart-line-primary)"
                  strokeWidth={2}
                />
                <Line
                  dataKey="unique_visitors"
                  stroke="var(--chart-line-secondary)"
                  strokeWidth={2}
                />
                <ChartTooltip
                  rowLabels={{
                    total_sessions: "Sessions",
                    unique_visitors: "Unique Visitors",
                  }}
                />
              </LineChart>
            </div>
          )}
        </Callout>
      </div>
    </Section>
  );
};

export { InsightsSection };
