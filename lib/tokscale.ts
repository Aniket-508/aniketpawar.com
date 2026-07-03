import "server-only";
import { unstable_cache } from "next/cache";

import { GITHUB } from "@/constants/links";
import type {
  RawClient,
  RawInitialData,
  RawModelUsage,
  TokscaleBiggestDay,
  TokscaleDailyPoint,
  TokscaleInsights,
  TokscaleUsageEntry,
} from "@/types/tokscale";

const TOKSCALE_URL = `https://tokscale.ai/u/${GITHUB.user}`;
const TOP_MODELS_LIMIT = 8;
const SYNTHETIC_MODEL = "<synthetic>";

const PUSH_CHUNK = /self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/gu;

const parseChunk = (raw: string): string | null => {
  try {
    return JSON.parse(raw) as string;
  } catch {
    return null;
  }
};

const rebuildFlightPayload = (html: string): string => {
  const chunks: string[] = [];
  let match = PUSH_CHUNK.exec(html);

  while (match !== null) {
    const chunk = parseChunk(match[1]);
    if (chunk) {
      chunks.push(chunk);
    }
    match = PUSH_CHUNK.exec(html);
  }

  return chunks.join("");
};

const NULL_PLACEHOLDER = "\u0000";

const unescapeOnce = (value: string): string =>
  value
    .replaceAll("\\\\", NULL_PLACEHOLDER)
    .replaceAll('\\"', '"')
    .replaceAll("\\n", "\n")
    .replaceAll("\\r", "\r")
    .replaceAll("\\t", "\t")
    .replaceAll("\\/", "/")
    .replaceAll(NULL_PLACEHOLDER, "\\");

const sliceBalancedObject = (source: string): string | null => {
  let depth = 0;
  let inString = false;
  let isEscaped = false;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];

    if (inString) {
      if (isEscaped) {
        isEscaped = false;
      } else if (char === "\\") {
        isEscaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
    } else if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(0, i + 1);
      }
    }
  }

  return null;
};

const extractInitialData = (html: string): RawInitialData | null => {
  const payload = rebuildFlightPayload(html);
  const anchor = payload.indexOf("initialData");
  if (anchor === -1) {
    return null;
  }

  const objectStart = payload.lastIndexOf("{", anchor);
  if (objectStart === -1) {
    return null;
  }

  const unescaped = unescapeOnce(payload.slice(objectStart));
  const balanced = sliceBalancedObject(unescaped);
  if (!balanced) {
    return null;
  }

  try {
    const parsed = JSON.parse(balanced) as {
      initialData?: RawInitialData;
    };
    return parsed.initialData ?? null;
  } catch {
    return null;
  }
};

const sortByTokensDesc = (a: TokscaleUsageEntry, b: TokscaleUsageEntry) =>
  b.tokens - a.tokens;

const sumClientTokens = (models: Record<string, RawModelUsage>): number => {
  let total = 0;
  for (const [name, model] of Object.entries(models)) {
    if (name !== SYNTHETIC_MODEL) {
      total += model.tokens;
    }
  }
  return total;
};

const buildAgentBreakdown = (clients: RawClient[]): TokscaleUsageEntry[] =>
  clients
    .map((client) => ({
      cost: client.cost,
      name: client.client,
      tokens: sumClientTokens(client.models),
    }))
    .toSorted(sortByTokensDesc);

const buildModelBreakdown = (clients: RawClient[]): TokscaleUsageEntry[] => {
  const totals = new Map<string, { tokens: number; cost: number }>();

  for (const client of clients) {
    for (const [name, usage] of Object.entries(client.models)) {
      if (name === SYNTHETIC_MODEL) {
        continue;
      }
      const current = totals.get(name) ?? { cost: 0, tokens: 0 };
      totals.set(name, {
        cost: current.cost + usage.cost,
        tokens: current.tokens + usage.tokens,
      });
    }
  }

  return [...totals.entries()]
    .map(([name, usage]) => ({
      cost: usage.cost,
      name,
      tokens: usage.tokens,
    }))
    .toSorted(sortByTokensDesc);
};

const toInsights = (data: RawInitialData): TokscaleInsights => {
  const models = data.modelUsage
    .filter((entry) => entry.model !== SYNTHETIC_MODEL)
    .toSorted((a, b) => b.tokens - a.tokens)
    .slice(0, TOP_MODELS_LIMIT);

  const series: TokscaleDailyPoint[] = data.contributions
    .map((point) => ({
      agents: buildAgentBreakdown(point.clients),
      cost: point.totals.cost,
      date: new Date(point.date).toISOString(),
      models: buildModelBreakdown(point.clients),
      tokens: point.totals.tokens,
    }))
    .toSorted(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  let biggestDay: TokscaleBiggestDay | null = null;
  for (const point of series) {
    if (biggestDay === null || point.cost > biggestDay.cost) {
      biggestDay = {
        cost: point.cost,
        date: point.date,
        tokens: point.tokens,
      };
    }
  }

  return {
    biggestDay,
    endDate: data.dateRange.end,
    models,
    series,
    startDate: data.dateRange.start,
    stats: data.stats,
  };
};

export const getTokscaleInsights = unstable_cache(
  async (): Promise<TokscaleInsights | null> => {
    const res = await fetch(TOKSCALE_URL, {
      headers: { "User-Agent": "aniketpawar.com" },
    });

    if (!res.ok) {
      return null;
    }

    const data = extractInitialData(await res.text());
    return data ? toInsights(data) : null;
  },
  ["tokscale-insights"],
  { revalidate: 86_400 }
);
