import { format } from "date-fns";

import { AnimatedNumber } from "@/components/animated-number";
import { ProviderLogo } from "@/components/stats/provider-logo";
import { TokensChart } from "@/components/stats/tokens-chart";
import type { TokensChartPoint } from "@/components/stats/tokens-chart";
import { Callout } from "@/components/ui/callout";
import { Metric, MetricLabel, MetricValue } from "@/components/ui/metric";
import {
  COMPACT_NUMBER_FORMAT,
  formatCompactNumber,
  formatUsd,
  USD_FORMAT,
} from "@/lib/format";
import { getModelLogoUrl } from "@/lib/models";
import type { TokscaleInsights } from "@/types/tokscale";

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <span className="flex items-center gap-1.5">
    <span
      className="size-2 shrink-0 rounded-full"
      style={{ backgroundColor: color }}
    />
    {label}
  </span>
);

interface TokenUsageProps {
  data: TokscaleInsights;
}

const TokenUsage = ({ data }: TokenUsageProps) => {
  const { stats, models, series, biggestDay } = data;

  const maxTokens = Math.max(...series.map((point) => point.tokens), 0);
  const maxCost = Math.max(...series.map((point) => point.cost), 0);

  const chartData: TokensChartPoint[] = series.map((point) => ({
    agents: point.agents,
    cost: point.cost,
    costPct: maxCost > 0 ? (point.cost / maxCost) * 100 : 0,
    date: point.date,
    models: point.models,
    tokens: point.tokens,
    tokensPct: maxTokens > 0 ? (point.tokens / maxTokens) * 100 : 0,
  }));

  return (
    <div className="space-y-4 p-[44px]">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Favorite model{" "}
          <span className="font-medium text-foreground">
            {models[0]?.model ?? "—"}
          </span>
        </span>
        <span>
          {format(new Date(data.startDate), "dd MMM")} –{" "}
          {format(new Date(data.endDate), "dd MMM yyyy")}
        </span>
      </div>

      <Callout className="space-y-1 p-1">
        <dl className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          <Metric>
            <MetricLabel>Total Tokens</MetricLabel>
            <MetricValue>
              <AnimatedNumber
                format={COMPACT_NUMBER_FORMAT}
                value={stats.totalTokens}
              />
            </MetricValue>
          </Metric>
          <Metric>
            <MetricLabel>Input Tokens</MetricLabel>
            <MetricValue>
              <AnimatedNumber
                format={COMPACT_NUMBER_FORMAT}
                value={stats.inputTokens}
              />
            </MetricValue>
          </Metric>
          <Metric>
            <MetricLabel>Output Tokens</MetricLabel>
            <MetricValue>
              <AnimatedNumber
                format={COMPACT_NUMBER_FORMAT}
                value={stats.outputTokens}
              />
            </MetricValue>
          </Metric>
          <Metric>
            <MetricLabel>Total Cost</MetricLabel>
            <MetricValue>
              <AnimatedNumber format={USD_FORMAT} value={stats.totalCost} />
            </MetricValue>
          </Metric>
          <Metric>
            <MetricLabel>Active Days</MetricLabel>
            <MetricValue>
              <AnimatedNumber value={stats.activeDays} />
            </MetricValue>
          </Metric>
          <Metric>
            <MetricLabel>Biggest Day</MetricLabel>
            <MetricValue>
              <AnimatedNumber
                format={USD_FORMAT}
                value={biggestDay?.cost ?? 0}
              />
            </MetricValue>
            {biggestDay && (
              <span className="text-xs text-muted-foreground">
                {format(new Date(biggestDay.date), "dd MMM yyyy")}
              </span>
            )}
          </Metric>
        </dl>

        {chartData.length > 0 && (
          <div className="space-y-3 rounded-md bg-background p-3">
            <TokensChart data={chartData} />
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <LegendItem color="var(--chart-line-primary)" label="Tokens" />
              <LegendItem color="var(--chart-line-secondary)" label="Cost" />
            </div>
          </div>
        )}

        {models.length > 0 && (
          <div className="rounded-md bg-background p-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground">
                  <th className="py-1.5 text-left font-normal">Model</th>
                  <th className="py-1.5 text-right font-normal">Tokens</th>
                  <th className="py-1.5 text-right font-normal">Cost</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr className="border-t border-border/50" key={model.model}>
                    <td className="py-1.5 font-medium">
                      <span className="flex items-center gap-1.5">
                        <ProviderLogo url={getModelLogoUrl(model.model)} />
                        {model.model}
                      </span>
                    </td>
                    <td className="py-1.5 text-right tabular-nums">
                      {formatCompactNumber(model.tokens)}
                    </td>
                    <td className="py-1.5 text-right tabular-nums text-muted-foreground">
                      {formatUsd(model.cost)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Callout>
    </div>
  );
};

export { TokenUsage, type TokenUsageProps };
