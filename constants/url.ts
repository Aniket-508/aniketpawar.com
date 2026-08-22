import { env } from "@/env";

export const FALLBACK_SITE_ORIGIN = "https://www.aniketpawar.com" as const;

export const getBaseUrl = () => {
  if (env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }
  if (env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_ORIGIN;
};
