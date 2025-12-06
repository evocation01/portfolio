import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";

// Use global variable to cache the client in development
// This prevents exhausting database connections during hot-reloads
const globalForDb = globalThis as unknown as {
    conn: typeof sql | undefined;
};

// Log POSTGRES_URL for debugging purposes in Vercel logs
console.log("[lib/db.ts] POSTGRES_URL:", process.env.POSTGRES_URL ? "******" : "UNDEFINED");
if (process.env.POSTGRES_URL && !process.env.POSTGRES_URL.includes("password")) {
    console.log("[lib/db.ts] POSTGRES_URL (partial):", process.env.POSTGRES_URL.substring(0, 20));
}


const conn = globalForDb.conn ?? sql;

if (process.env.NODE_ENV !== "production") {
    globalForDb.conn = conn;
}

export const db = drizzle(conn, { schema });
