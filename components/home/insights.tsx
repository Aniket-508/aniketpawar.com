import { format } from "date-fns";
import { BarChartIcon } from "lucide-react";

import { CopyLink } from "@/components/copy-link";
import { Section } from "@/components/layout/section";
import { Title } from "@/components/ui/title";
import { getClarityInsights } from "@/lib/clarity-analytics";
import { cn } from "@/lib/utils";

const Metric = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={cn("flex flex-col gap-1", className)} {...props} />
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

  const breakdown = data.breakdown ?? [];
  const maxSessions =
    breakdown.length > 0
      ? Math.max(...breakdown.map((item) => item.sessions))
      : 0;

  return (
    <Section id="insights" className="delay-[300ms] space-y-4">
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

      <div className="bg-accent rounded-lg p-4">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <BarChartIcon className="h-4 w-4" />
          <span>
            {format(new Date(data.startDate), "dd MMM")} –{" "}
            {format(new Date(data.endDate), "dd MMM yyyy")}
          </span>
        </div>

        <dl className="mb-6 grid grid-cols-3 gap-4">
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

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Top Browsers</h3>
          {breakdown.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="tabular-nums">
                  {item.sessions.toLocaleString()}
                </span>
              </div>
              <div className="bg-muted-foreground/10 h-2 overflow-hidden rounded-full">
                <div
                  className={cn(
                    "bg-muted-foreground/40 h-full rounded-full transition-all duration-500"
                  )}
                  style={{
                    width: `${maxSessions > 0 ? (item.sessions / maxSessions) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export { InsightsSection };
