import { createClient } from "@libsql/client";
import type { Client } from "@libsql/client";

import { env } from "@/env";

let client: Client | null = null;

export const getDb = (): Client | null => {
  if (!env.TURSO_DATABASE_URL) {
    return null;
  }

  client ??= createClient({
    authToken: env.TURSO_AUTH_TOKEN,
    url: env.TURSO_DATABASE_URL,
  });

  return client;
};
