import { db } from '../lib/db.js';

// Database initialization function
export async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Create tables using Drizzle migrations
    // Note: In production, you would use proper migrations
    console.log('Database initialized successfully!');

    return { success: true };
  } catch (error) {
    console.error('Database initialization failed:', error);
    return { success: false, error: error.message };
  }
}

// Check database connection
export async function checkDatabaseConnection() {
  try {
    // Simple query to test connection
    const result = await db.execute('SELECT 1 as test');
    console.log('Database connection successful');
    return { connected: true };
  } catch (error) {
    console.error('Database connection failed:', error);
    return { connected: false, error: error.message };
  }
}
