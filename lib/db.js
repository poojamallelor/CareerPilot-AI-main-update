import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Database connection string - you'll need to replace this with your actual Neon DB connection string
const connectionString = process.env.DATABASE_URL || "postgresql://demo:demo@demo.neon.tech/demo?sslmode=require";

// Create the database connection
const sql = neon(connectionString);
const db = drizzle(sql);

export { db, sql };
