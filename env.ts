import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_CLARITY_PROJECT_ID: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.url().optional(),
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLARITY_PROJECT_ID: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL:
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  server: {
    CLARITY_API_TOKEN: z.string().optional(),
    GITHUB_CONTRIBUTIONS_API_URL: z.url().optional(),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
});
