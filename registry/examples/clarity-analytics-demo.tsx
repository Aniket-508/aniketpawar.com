import { ClarityAnalytics } from "@/registry/components/clarity-analytics/clarity-analytics";
import type { ClarityInsights } from "@/types/clarity";

const mockClarityData: ClarityInsights = {
  breakdown: [],
  endDate: "2025-01-25",
  series: [
    { date: new Date("2025-01-20"), total_sessions: 120, unique_visitors: 95 },
    { date: new Date("2025-01-21"), total_sessions: 135, unique_visitors: 110 },
    { date: new Date("2025-01-22"), total_sessions: 142, unique_visitors: 118 },
    { date: new Date("2025-01-23"), total_sessions: 128, unique_visitors: 105 },
    { date: new Date("2025-01-24"), total_sessions: 155, unique_visitors: 130 },
    { date: new Date("2025-01-25"), total_sessions: 168, unique_visitors: 142 },
  ],
  startDate: "2025-01-20",
  summary: {
    pagesPerSession: 3.2,
    totalSessions: 848,
    uniqueVisitors: 700,
  },
  topCountry: "India",
};

const ClarityAnalyticsDemo = () => <ClarityAnalytics data={mockClarityData} />;

export { ClarityAnalyticsDemo };
