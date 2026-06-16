import { env } from "@/env";

export const FALLBACK_SITE_ORIGIN = "https://www.aniketpawar.com" as const;

export const getBaseUrl = () => {
  if (env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }
  if (env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return env.SITE_URL ?? FALLBACK_SITE_ORIGIN;
};
