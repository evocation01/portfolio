import { loadEnvConfig } from "@next/env"; // New import
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "./schema";

// Ensure environment variables are loaded
const projectDir = process.cwd();
const dev = process.env.NODE_ENV !== "production";
loadEnvConfig(projectDir, dev);

// Use global variable to cache the client in development
// This prevents exhausting database connections during hot-loads
const globalForDb = globalThis as unknown as {
    conn: typeof sql | undefined;
};

const conn = globalForDb.conn ?? sql;

if (process.env.NODE_ENV !== "production") {
    globalForDb.conn = conn;
}

export const db = drizzle(conn, { schema });
