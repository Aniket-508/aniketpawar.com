import { format } from "date-fns";

import { AnimatedNumber } from "@/components/animated-number";
import { Grid } from "@/components/charts/grid";
import { Line } from "@/components/charts/line";
import { LineChart } from "@/components/charts/line-chart";
import { ChartTooltip } from "@/components/charts/tooltip";
import { Callout } from "@/components/ui/callout";
import { Metric, MetricLabel, MetricValue } from "@/components/ui/metric";
import type { ClarityInsights } from "@/types/clarity";

interface ClarityAnalyticsProps {
  data: ClarityInsights;
}

const ClarityAnalytics = ({ data }: ClarityAnalyticsProps) => (
  <div className="space-y-4 p-[44px]">
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>
        Last visit from{" "}
        <span className="font-medium text-foreground">{data.topCountry}</span>
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
            <AnimatedNumber value={data.summary.uniqueVisitors} />
          </MetricValue>
        </Metric>
        <Metric>
          <MetricLabel>Sessions</MetricLabel>
          <MetricValue>
            <AnimatedNumber value={data.summary.totalSessions} />
          </MetricValue>
        </Metric>
        <Metric>
          <MetricLabel>Pages / Session</MetricLabel>
          <MetricValue>
            <AnimatedNumber
              format={{ maximumFractionDigits: 2 }}
              value={data.summary.pagesPerSession}
            />
          </MetricValue>
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
);

export { ClarityAnalytics, type ClarityAnalyticsProps };
