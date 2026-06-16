import Clarity from "@microsoft/clarity";
import { unstable_cache } from "next/cache";

import type {
  ClarityInsights,
  ClarityMetricResponse,
  ClarityTrafficData,
  DailyTraffic,
} from "@/types/clarity";

let initialized = false;

export const initClarity = (projectId: string): void => {
  if (initialized || !projectId || typeof window === "undefined") {
    return;
  }

  Clarity.init(projectId);
  initialized = true;
};

export const isClarityReady = (): boolean =>
  typeof window !== "undefined" &&
  typeof (window as Window & { clarity?: (...args: unknown[]) => void })
    .clarity === "function";

export { Clarity };

const CLARITY_API_BASE =
  "https://www.clarity.ms/export-data/api/v1/project-live-insights";

const fetchJson = async <T>(url: string, token: string): Promise<T | null> => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.ok ? ((await res.json()) as T) : null;
};

const fetchTrafficData = async (
  token: string,
  numOfDays: number
): Promise<ClarityTrafficData | null> => {
  const data = await fetchJson<ClarityMetricResponse[]>(
    `${CLARITY_API_BASE}?numOfDays=${numOfDays}`,
    token
  );

  const trafficMetric = data?.find((m) => m.metricName === "Traffic");
  if (!trafficMetric) {
    return null;
  }

  const { information: info } = trafficMetric;
  const len = info.length;

  return {
    avgPagesPerSession:
      len > 0
        ? info.reduce((s, i) => s + (i.PagesPerSessionPercentage || 0), 0) / len
        : 0,
    sessions: info.reduce((s, i) => s + (Number(i.totalSessionCount) || 0), 0),
    visitors: info.reduce((s, i) => s + (Number(i.distantUserCount) || 0), 0),
  };
};

const buildDailySeries = (
  today: Date,
  day1: ClarityTrafficData | null,
  day2: ClarityTrafficData | null,
  day3: ClarityTrafficData
): DailyTraffic[] => {
  const entries: DailyTraffic[] = [];

  if (day1) {
    const d = new Date(today);
    d.setDate(d.getDate() - 1);
    entries.push({
      date: d,
      total_sessions: day1.sessions,
      unique_visitors: day1.visitors,
    });
  }

  if (day2) {
    const d = new Date(today);
    d.setDate(d.getDate() - 2);
    entries.push({
      date: d,
      total_sessions: day1 ? day2.sessions - day1.sessions : day2.sessions,
      unique_visitors: day1 ? day2.visitors - day1.visitors : day2.visitors,
    });
  }

  {
    const d = new Date(today);
    d.setDate(d.getDate() - 3);
    entries.push({
      date: d,
      total_sessions: day2 ? day3.sessions - day2.sessions : day3.sessions,
      unique_visitors: day2 ? day3.visitors - day2.visitors : day3.visitors,
    });
  }

  return entries.toSorted((a, b) => a.date.getTime() - b.date.getTime());
};

const parseBreakdown = (
  data: ClarityMetricResponse[]
): { breakdown: ClarityInsights["breakdown"]; topCountry: string } => {
  const trafficMetric = data.find((m) => m.metricName === "Traffic");
  if (!trafficMetric) {
    return { breakdown: [], topCountry: "Unknown" };
  }

  const browserMap = new Map<string, { sessions: number; visitors: number }>();
  const countryMap = new Map<string, number>();

  for (const item of trafficMetric.information) {
    const browser = item.Browser || "Unknown";
    const existing = browserMap.get(browser) ?? { sessions: 0, visitors: 0 };
    browserMap.set(browser, {
      sessions: existing.sessions + Number(item.totalSessionCount),
      visitors: existing.visitors + Number(item.distantUserCount),
    });

    const country = item["Country/Region"];
    if (country) {
      countryMap.set(
        country,
        (countryMap.get(country) ?? 0) + Number(item.totalSessionCount)
      );
    }
  }

  const breakdown = [...browserMap.entries()]
    .map(([label, val]) => ({
      label,
      sessions: val.sessions,
      visitors: val.visitors,
    }))
    .toSorted((a, b) => b.sessions - a.sessions)
    .slice(0, 6);

  const sorted = [...countryMap.entries()].toSorted((a, b) => b[1] - a[1]);
  const topCountry = sorted[0]?.[0] ?? "Unknown";

  return { breakdown, topCountry };
};

const getStubInsights = (): ClarityInsights => {
  const today = new Date();
  const dates = [1, 2, 3].map((daysAgo) => {
    const d = new Date(today);
    d.setDate(d.getDate() - daysAgo);
    return d;
  });

  return {
    breakdown: [
      { label: "Chrome", sessions: 812, visitors: 580 },
      { label: "Safari", sessions: 249, visitors: 178 },
      { label: "Firefox", sessions: 112, visitors: 81 },
      { label: "Edge", sessions: 74, visitors: 53 },
    ],
    endDate: today.toISOString(),
    series: [
      { date: dates[2], total_sessions: 310, unique_visitors: 220 },
      { date: dates[1], total_sessions: 425, unique_visitors: 305 },
      { date: dates[0], total_sessions: 512, unique_visitors: 367 },
    ],
    startDate: dates[2].toISOString(),
    summary: {
      pagesPerSession: 2.34,
      totalSessions: 1247,
      uniqueVisitors: 892,
    },
    topCountry: "India",
  };
};

const fetchClarityData = async (
  token: string,
  numOfDays: number
): Promise<ClarityInsights> => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - numOfDays);
  const endDate = new Date();
  const today = new Date();

  const [day1, day2, day3] = await Promise.all([
    fetchTrafficData(token, 1),
    fetchTrafficData(token, 2),
    fetchTrafficData(token, 3),
  ]);

  if (!day3) {
    return getStubInsights();
  }

  const series = buildDailySeries(today, day1, day2, day3);

  const breakdownData = await fetchJson<ClarityMetricResponse[]>(
    `${CLARITY_API_BASE}?numOfDays=${numOfDays}&dimension1=Browser&dimension2=Country/Region`,
    token
  );

  const { breakdown, topCountry } = breakdownData
    ? parseBreakdown(breakdownData)
    : { breakdown: [], topCountry: "Unknown" };

  return {
    breakdown,
    endDate: endDate.toISOString(),
    series,
    startDate: startDate.toISOString(),
    summary: {
      pagesPerSession: Number(day3.avgPagesPerSession),
      totalSessions: day3.sessions,
      uniqueVisitors: day3.visitors,
    },
    topCountry,
  };
};

export const getClarityInsights = unstable_cache(
  async (): Promise<ClarityInsights | null> => {
    if (typeof window !== "undefined") {
      return null;
    }

    const token = process.env.CLARITY_API_TOKEN;
    if (!token) {
      return null;
    }

    try {
      return await fetchClarityData(token, 3);
    } catch {
      return getStubInsights();
    }
  },
  ["clarity-insights"],
  { revalidate: 86_400 }
);
