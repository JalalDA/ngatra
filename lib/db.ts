import { sql } from "@vercel/postgres";
import { drizzle as vercelDrizzle } from "drizzle-orm/vercel-postgres";
import { drizzle as nodeDrizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
const dbType = process.env.DATABASE_TYPE ?? "node";
let db;
if (dbType === "vercel") {
  db = vercelDrizzle(sql, { schema, logger: true });
} else {
  db = nodeDrizzle(pool, { schema, logger: true });
}
export default db as typeof db & { schema: typeof schema };

export type DrizzleClient = typeof db;
