import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load env the way Next.js does: .env first, then .env.local overrides it.
// A bare `import "dotenv/config"` only reads .env, so it would miss .env.local.
loadEnv();
loadEnv({ path: ".env.local", override: true });

type Env = { DATABASE_URL: string };

// Prisma 7 reads the CLI connection (migrate / db push) from here, not the schema.
// Runtime connection is provided by the driver adapter in src/lib/prisma.ts.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env<Env>("DATABASE_URL") },
});
