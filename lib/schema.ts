import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  createdAt: integer("createdAt", { mode: "timestamp" }),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).default(false),
  github_id: integer("github_id").notNull().unique(),
  id: text("id").primaryKey(),
  image: text("image"),
  name: text("name"),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
  username: text("username").notNull(),
});

export const session = sqliteTable(
  "session",
  {
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
    id: text("id").primaryKey(),
    ipAddress: text("ipAddress"),
    token: text("token").notNull().unique(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    userAgent: text("userAgent"),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("idx_session_userId").on(table.userId)]
);

export const account = sqliteTable(
  "account",
  {
    accessToken: text("accessToken"),
    accessTokenExpiresAt: integer("accessTokenExpiresAt", {
      mode: "timestamp",
    }),
    accountId: text("accountId").notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    id: text("id").primaryKey(),
    idToken: text("idToken"),
    password: text("password"),
    providerId: text("providerId").notNull(),
    refreshToken: text("refreshToken"),
    refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
      mode: "timestamp",
    }),
    scope: text("scope"),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("idx_account_userId").on(table.userId),
    uniqueIndex("idx_account_provider").on(table.providerId, table.accountId),
  ]
);

export const verification = sqliteTable(
  "verification",
  {
    createdAt: integer("createdAt", { mode: "timestamp" }),
    expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }),
    value: text("value").notNull(),
  },
  (table) => [index("idx_verification_identifier").on(table.identifier)]
);

export const post = sqliteTable("post", {
  created_at: integer("created_at", { mode: "timestamp" }).notNull(),
  id: text("id").primaryKey(),
  message: text("message").notNull(),
  signature: text("signature"),
  user_id: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id),
});
