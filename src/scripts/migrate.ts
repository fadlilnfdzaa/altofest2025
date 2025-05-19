import { sql } from '@vercel/postgres';
import { initializeDatabase } from '@/lib/db';

async function migrate() {
  try {
    console.log('Starting database migration...');
    
    // Initialize the database schema
    const success = await initializeDatabase();
    
    if (success) {
      console.log('Database migration completed successfully');
    } else {
      console.error('Database migration failed');
    }
    
    // Close the connection
    await sql.end();
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
