import { env } from "@/env";

export const isGuestbookConfigured = (): boolean =>
  Boolean(
    env.TURSO_DATABASE_URL &&
    env.GITHUB_CLIENT_ID &&
    env.GITHUB_CLIENT_SECRET &&
    env.BETTER_AUTH_SECRET
  );
