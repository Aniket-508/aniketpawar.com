export interface TokscaleStats {
  totalTokens: number;
  totalCost: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  reasoningTokens: number;
  activeDays: number;
  sessionCount: number;
}

export interface TokscaleModelUsage {
  model: string;
  tokens: number;
  cost: number;
  percentage: number;
}

export interface TokscaleUsageEntry {
  name: string;
  tokens: number;
  cost: number;
}

export interface TokscaleDailyPoint {
  date: string;
  tokens: number;
  cost: number;
  agents: TokscaleUsageEntry[];
  models: TokscaleUsageEntry[];
}

export interface TokscaleBiggestDay {
  date: string;
  tokens: number;
  cost: number;
}

export interface TokscaleInsights {
  stats: TokscaleStats;
  models: TokscaleModelUsage[];
  series: TokscaleDailyPoint[];
  biggestDay: TokscaleBiggestDay | null;
  startDate: string;
  endDate: string;
}

export interface RawModelUsage {
  tokens: number;
  cost: number;
}

export interface RawClient {
  client: string;
  cost: number;
  models: Record<string, RawModelUsage>;
}

export interface RawContribution {
  date: string;
  totals: { tokens: number; cost: number; messages: number };
  clients: RawClient[];
}

export interface RawInitialData {
  stats: TokscaleStats;
  dateRange: { start: string; end: string };
  modelUsage: TokscaleModelUsage[];
  contributions: RawContribution[];
}
