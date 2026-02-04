import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

let _pool: pg.Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (_db && _pool) {
    return { db: _db, pool: _pool };
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    // IMPORTANT: no throwing at import-time.
    // Throw only when something actually tries to use the DB.
    throw new Error(
      "DATABASE_URL is not set. Add it to your .env (local) or environment variables (server).",
    );
  }

  _pool = new Pool({ connectionString: url });
  _db = drizzle(_pool, { schema });

  return { db: _db, pool: _pool };
}