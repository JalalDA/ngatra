// import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});
const db = drizzle(pool, { schema, logger: true });

  
export default db;

export type DrizzleClient = typeof db;