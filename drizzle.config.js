import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/schema.js',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "postgresql://demo:demo@demo.neon.tech/demo?sslmode=require",
  },
  verbose: true,
  strict: true,
});
