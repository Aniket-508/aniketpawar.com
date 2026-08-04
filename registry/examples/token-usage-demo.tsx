import { TokenUsage } from "@/registry/components/token-usage/token-usage";
import type { TokscaleInsights } from "@/types/tokscale";

const mockTokenData: TokscaleInsights = {
  biggestDay: { cost: 12.5, date: "2025-01-24", tokens: 450_000 },
  endDate: "2025-01-25",
  models: [
    { cost: 25.5, model: "claude-3.5-sonnet", percentage: 60, tokens: 850_000 },
    { cost: 12.3, model: "gpt-4o", percentage: 30, tokens: 420_000 },
    { cost: 4.7, model: "claude-3-haiku", percentage: 10, tokens: 180_000 },
  ],
  series: [
    {
      agents: [],
      cost: 5.2,
      date: "2025-01-20",
      models: [
        { cost: 3.1, name: "claude-3.5-sonnet", tokens: 120_000 },
        { cost: 2.1, name: "gpt-4o", tokens: 85_000 },
      ],
      tokens: 205_000,
    },
    {
      agents: [],
      cost: 7.8,
      date: "2025-01-21",
      models: [
        { cost: 4.5, name: "claude-3.5-sonnet", tokens: 180_000 },
        { cost: 3.3, name: "gpt-4o", tokens: 130_000 },
      ],
      tokens: 310_000,
    },
    {
      agents: [],
      cost: 6.1,
      date: "2025-01-22",
      models: [
        { cost: 3.8, name: "claude-3.5-sonnet", tokens: 150_000 },
        { cost: 2.3, name: "gpt-4o", tokens: 95_000 },
      ],
      tokens: 245_000,
    },
    {
      agents: [],
      cost: 9.2,
      date: "2025-01-23",
      models: [
        { cost: 5.5, name: "claude-3.5-sonnet", tokens: 220_000 },
        { cost: 3.7, name: "gpt-4o", tokens: 148_000 },
      ],
      tokens: 368_000,
    },
    {
      agents: [],
      cost: 12.5,
      date: "2025-01-24",
      models: [
        { cost: 7.2, name: "claude-3.5-sonnet", tokens: 290_000 },
        { cost: 5.3, name: "gpt-4o", tokens: 210_000 },
      ],
      tokens: 500_000,
    },
    {
      agents: [],
      cost: 8.4,
      date: "2025-01-25",
      models: [
        { cost: 5, name: "claude-3.5-sonnet", tokens: 200_000 },
        { cost: 3.4, name: "gpt-4o", tokens: 135_000 },
      ],
      tokens: 335_000,
    },
  ],
  startDate: "2025-01-20",
  stats: {
    activeDays: 6,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    inputTokens: 950_000,
    outputTokens: 708_000,
    reasoningTokens: 0,
    sessionCount: 42,
    totalCost: 49.3,
    totalTokens: 1_658_000,
  },
};

const TokenUsageDemo = () => <TokenUsage data={mockTokenData} />;

export { TokenUsageDemo };
