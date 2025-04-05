import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";
import { env } from "@/data/env/server";

// In Node environments where WebSocket isn’t defined globally,
// you must provide a WebSocket constructor.
neonConfig.webSocketConstructor = ws;

// Create a connection pool with your Neon connection string.
const pool = new Pool({ connectionString: env.DATABASE_URL });

// Initialize Drizzle ORM with the pool and your schema.
export const db = drizzle({ client: pool, schema });
