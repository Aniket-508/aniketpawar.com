import "server-only";
import { unstable_cache } from "next/cache";

interface ClarityTrafficInfo {
  totalSessionCount: string;
  totalBotSessionCount: string;
  distantUserCount: string;
  PagesPerSessionPercentage: number;
  OS?: string;
  Browser?: string;
  Device?: string;
  "Country/Region"?: string;
  Source?: string;
  Medium?: string;
}

interface ClarityMetricResponse {
  metricName: string;
  information: ClarityTrafficInfo[];
}

export interface ClarityInsights {
  summary: {
    uniqueVisitors: number;
    totalSessions: number;
    pagesPerSession: number;
  };
  breakdown: {
    label: string;
    sessions: number;
    visitors: number;
  }[];
  startDate: string;
  endDate: string;
}

export const getClarityInsights = unstable_cache(
  async (): Promise<ClarityInsights | null> => {
    const token = process.env.CLARITY_API_TOKEN;

    if (!token) {
      return null;
    }

    try {
      const numOfDays = 3;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - numOfDays);
      const endDate = new Date();

      const res = await fetch(
        `https://www.clarity.ms/export-data/api/v1/project-live-insights?numOfDays=${numOfDays}&dimension1=Browser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        return null;
      }

      const data = (await res.json()) as ClarityMetricResponse[];

      const trafficMetric = data.find((m) => m.metricName === "Traffic");

      if (!trafficMetric) {
        return null;
      }

      const info = trafficMetric.information;

      const totalSessions = info.reduce(
        (sum, item) => sum + (Number(item.totalSessionCount) || 0),
        0
      );

      const uniqueVisitors = info.reduce(
        (sum, item) => sum + (Number(item.distantUserCount) || 0),
        0
      );

      const avgPagesPerSession =
        info.length > 0
          ? info.reduce(
              (sum, item) => sum + (item.PagesPerSessionPercentage || 0),
              0
            ) / info.length
          : 0;

      const breakdown = info.map((item) => ({
        label: item.Browser || item.OS || item.Device || "Unknown",
        sessions: Number(item.totalSessionCount),
        visitors: Number(item.distantUserCount),
      }));

      breakdown.sort((a, b) => b.sessions - a.sessions);

      return {
        breakdown: breakdown.slice(0, 6),
        endDate: endDate.toISOString(),
        startDate: startDate.toISOString(),
        summary: {
          pagesPerSession: Math.round(avgPagesPerSession * 100) / 100,
          totalSessions,
          uniqueVisitors,
        },
      };
    } catch {
      return null;
    }
  },
  ["clarity-insights"],
  { revalidate: 86_400 }
);
