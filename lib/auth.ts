import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "@/env";
import { getDrizzleDb } from "@/lib/drizzle";
import * as schema from "@/lib/schema";

const getTrustedOrigins = (): string[] | undefined => {
  if (env.BETTER_AUTH_TRUSTED_ORIGINS) {
    return env.BETTER_AUTH_TRUSTED_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean);
  }

  if (env.BETTER_AUTH_URL) {
    return [env.BETTER_AUTH_URL];
  }

  return undefined;
};

const drizzleDb = getDrizzleDb();
const trustedOrigins = getTrustedOrigins();

export const auth = drizzleDb
  ? betterAuth({
      ...(env.BETTER_AUTH_URL ? { baseURL: env.BETTER_AUTH_URL } : {}),
      ...(trustedOrigins ? { trustedOrigins } : {}),
      database: drizzleAdapter(drizzleDb, {
        provider: "sqlite",
        schema,
      }),
      secret: env.BETTER_AUTH_SECRET,
      socialProviders: {
        github: {
          clientId: env.GITHUB_CLIENT_ID ?? "",
          clientSecret: env.GITHUB_CLIENT_SECRET ?? "",
          mapProfileToUser: (profile) => ({
            email: profile.email,
            github_id: profile.id,
            image: profile.avatar_url,
            name: profile.name || profile.login,
            username: profile.login,
          }),
          scope: ["read:user", "user:email"],
        },
      },
      user: {
        additionalFields: {
          github_id: { input: false, required: true, type: "number" },
          username: { input: false, required: true, type: "string" },
        },
      },
    })
  : null;

export type Session = NonNullable<typeof auth>["$Infer"]["Session"]["session"];
