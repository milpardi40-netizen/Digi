import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const isGhPages = process.env.GITHUB_PAGES === "true";
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && !isGhPages) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

const maxPool = process.env.PG_POOL_MAX ? Number(process.env.PG_POOL_MAX) : undefined;

export const pool = isGhPages
  ? (null as unknown as Pool)
  : (globalForDb.__arenaNextJsPostgresqlPool ??
      new Pool({
        connectionString: databaseUrl,
        ...(maxPool ? { max: maxPool } : {}),
      }));

if (process.env.NODE_ENV !== "production" && !isGhPages) {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = isGhPages
  ? (null as unknown as ReturnType<typeof drizzle>)
  : drizzle(pool);
