"use client";

import type { ReactNode } from "react";

import { Grid } from "@/components/charts/grid";
import { Line } from "@/components/charts/line";
import { LineChart } from "@/components/charts/line-chart";
import { ChartTooltip } from "@/components/charts/tooltip";
import { ProviderLogo } from "@/components/stats/provider-logo";
import { formatCompactNumber, formatUsd } from "@/lib/format";
import { getAgentLogoUrl, getModelLogoUrl } from "@/lib/models";
import type { TokscaleUsageEntry } from "@/types/tokscale";

export interface TokensChartPoint {
  date: string;
  tokens: number;
  cost: number;
  tokensPct: number;
  costPct: number;
  agents: TokscaleUsageEntry[];
  models: TokscaleUsageEntry[];
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    weekday: "short",
  });

const renderBreakdown = (
  entries: TokscaleUsageEntry[],
  getUrl: (name: string) => string
): ReactNode => {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="space-y-1">
      {entries.map((entry) => (
        <div
          className="flex items-center justify-between gap-4"
          key={entry.name}
        >
          <div className="flex items-center gap-1.5">
            <ProviderLogo
              className="text-chart-tooltip-muted"
              url={getUrl(entry.name)}
            />
            <span className="text-xs text-chart-tooltip-muted">
              {entry.name}
            </span>
          </div>
          <span className="text-xs text-chart-tooltip-foreground tabular-nums">
            {formatCompactNumber(entry.tokens)} / {formatUsd(entry.cost)}
          </span>
        </div>
      ))}
    </div>
  );
};

const renderTokensTooltip = ({
  point,
}: {
  point: Record<string, unknown>;
  index: number;
}) => {
  const data = point as unknown as TokensChartPoint;

  return (
    <div className="min-w-48 px-3 py-2.5">
      <div className="mb-2 flex items-center justify-between gap-4 text-sm text-chart-tooltip-foreground">
        <span>{formatDate(data.date)}</span>
        <span className="font-medium tabular-nums">
          {formatCompactNumber(data.tokens)} / {formatUsd(data.cost)}
        </span>
      </div>

      {renderBreakdown(data.agents, getAgentLogoUrl)}

      {data.agents.length > 0 && data.models.length > 0 && (
        <div className="my-2 border-chart-tooltip-muted/20 border-t" />
      )}

      {renderBreakdown(data.models, getModelLogoUrl)}
    </div>
  );
};

export const TokensChart = ({ data }: { data: TokensChartPoint[] }) => (
  <LineChart
    aspectRatio="2 / 1"
    data={data as unknown as Record<string, unknown>[]}
    margin={{ bottom: 40, left: 20, right: 20, top: 20 }}
    xDataKey="date"
  >
    <Grid horizontal strokeDasharray="3,3" />
    <Line
      dataKey="tokensPct"
      stroke="var(--chart-line-primary)"
      strokeWidth={2}
    />
    <Line
      dataKey="costPct"
      stroke="var(--chart-line-secondary)"
      strokeWidth={2}
    />
    <ChartTooltip content={renderTokensTooltip} />
  </LineChart>
);
