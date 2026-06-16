export interface ClarityTrafficInfo {
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

export interface ClarityMetricResponse {
  metricName: string;
  information: ClarityTrafficInfo[];
}

export interface DailyTraffic {
  date: Date;
  total_sessions: number;
  unique_visitors: number;
}

export interface ClarityBreakdownItem {
  label: string;
  sessions: number;
  visitors: number;
}

export interface ClaritySummary {
  uniqueVisitors: number;
  totalSessions: number;
  pagesPerSession: number;
}

export interface ClarityInsights {
  breakdown: ClarityBreakdownItem[];
  summary: ClaritySummary;
  topCountry: string;
  series: DailyTraffic[];
  startDate: string;
  endDate: string;
}

export interface ClarityTrafficData {
  sessions: number;
  visitors: number;
  avgPagesPerSession: number;
}
