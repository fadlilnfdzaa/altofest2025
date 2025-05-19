// Simple script to test database connection
require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

// Create a connection pool using environment variables
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  console.log('Testing database connection...');
  console.log(`Using connection string: ${process.env.POSTGRES_URL ? 'Found' : 'Not found'}`);
  
  try {
    // Test the connection
    const client = await pool.connect();
    console.log('Successfully connected to the database!');
    
    // Run a simple query
    const result = await client.query('SELECT NOW()');
    console.log('Database time:', result.rows[0].now);
    
    // Release the client
    client.release();
    
    // Close the pool
    await pool.end();
    
    console.log('Database connection test completed successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Run the test
testConnection();
