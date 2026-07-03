import { drizzle } from "drizzle-orm/libsql";

import { getDb } from "@/lib/db";
import * as schema from "@/lib/schema";

export const getDrizzleDb = () => {
  const db = getDb();

  if (!db) {
    return null;
  }

  return drizzle(db, { schema });
};
