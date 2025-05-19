import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  try {
    console.log('Testing database connection...');
    console.log(`Using connection string: ${process.env.POSTGRES_URL ? 'Found' : 'Not found'}`);
    
    // Create a connection pool
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    // Test the connection
    const client = await pool.connect();
    console.log('Successfully connected to the database!');
    
    // Run a simple query
    const result = await client.query('SELECT NOW()');
    const dbTime = result.rows[0].now;
    
    // Create the clicks table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS clicks (
        id SERIAL PRIMARY KEY,
        category VARCHAR(255) NOT NULL,
        label VARCHAR(255) NOT NULL,
        url TEXT,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Release the client
    client.release();
    
    // Close the pool
    await pool.end();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      dbTime,
      env: {
        postgresUrl: process.env.POSTGRES_URL ? 'Set' : 'Not set',
        postgresUser: process.env.POSTGRES_USER ? 'Set' : 'Not set',
        postgresHost: process.env.POSTGRES_HOST ? 'Set' : 'Not set',
        postgresDatabase: process.env.POSTGRES_DATABASE ? 'Set' : 'Not set'
      }
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      env: {
        postgresUrl: process.env.POSTGRES_URL ? 'Set' : 'Not set',
        postgresUser: process.env.POSTGRES_USER ? 'Set' : 'Not set',
        postgresHost: process.env.POSTGRES_HOST ? 'Set' : 'Not set',
        postgresDatabase: process.env.POSTGRES_DATABASE ? 'Set' : 'Not set'
      }
    }, { status: 500 });
  }
}
