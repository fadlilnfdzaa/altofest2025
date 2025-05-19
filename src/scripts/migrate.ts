import { initializeDatabase } from '@/lib/db';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function migrate() {
  try {
    console.log('Starting database migration...');
    console.log('Using database connection from environment variables');

    // Verify that we have the required environment variables
    if (!process.env.POSTGRES_URL) {
      console.error('Error: POSTGRES_URL environment variable is not set');
      console.log('Please make sure your .env.local file contains the correct database connection information');
      process.exit(1);
    }

    // Initialize the database schema
    const success = await initializeDatabase();

    if (success) {
      console.log('Database migration completed successfully');
    } else {
      console.error('Database migration failed');
    }
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

// Run the migration
migrate()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Unhandled error during migration:', error);
    process.exit(1);
  });
