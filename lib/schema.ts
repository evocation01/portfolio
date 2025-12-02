// lib/schema.ts
import {
    integer,
    pgTable,
    primaryKey,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    title_en: varchar("title_en", { length: 255 }).notNull(),
    description_en: text("description_en").notNull(),
    body_en: text("body_en").notNull(),
    title_tr: varchar("title_tr", { length: 255 }).notNull(),
    description_tr: text("description_tr").notNull(),
    body_tr: text("body_tr").notNull(),
    tags: text("tags").array(),
    github_url: varchar("github_url", { length: 255 }),
    live_url: varchar("live_url", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    hashedPassword: text("hashedPassword"),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);
