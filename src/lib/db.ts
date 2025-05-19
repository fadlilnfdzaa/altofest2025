import { Pool } from 'pg';

// Configure the database connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Define the structure of a click event
export interface ClickEvent {
  id?: number;
  category: string;
  label: string;
  url?: string;
  timestamp: string;
}

// Define the structure of the clicks data
export interface ClicksData {
  events: ClickEvent[];
  categoryCounts: Record<string, number>;
  labelCounts: Record<string, number>;
  urlCounts: Record<string, number>;
  totalClicks: number;
}

// Initialize the database schema if it doesn't exist
export async function initializeDatabase() {
  const client = await pool.connect();
  try {
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

    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  } finally {
    client.release();
  }
}

// Add a click event to the database
export async function addClickEvent(event: ClickEvent) {
  const client = await pool.connect();
  try {
    const { category, label, url } = event;
    const timestamp = new Date().toISOString();

    await client.query(
      `INSERT INTO clicks (category, label, url, timestamp)
       VALUES ($1, $2, $3, $4)`,
      [category, label, url, timestamp]
    );

    return true;
  } catch (error) {
    console.error('Error adding click event:', error);
    return false;
  } finally {
    client.release();
  }
}

// Get all click events from the database
export async function getClickEvents(): Promise<ClicksData> {
  const client = await pool.connect();
  try {
    // Get all events
    const eventsResult = await client.query('SELECT * FROM clicks ORDER BY timestamp DESC');
    const events = eventsResult.rows as ClickEvent[];

    // Calculate category counts
    const categoryCountsResult = await client.query(`
      SELECT category, COUNT(*) as count
      FROM clicks
      GROUP BY category
    `);
    const categoryCounts: Record<string, number> = {};
    categoryCountsResult.rows.forEach((row: any) => {
      categoryCounts[row.category] = Number(row.count);
    });

    // Calculate label counts
    const labelCountsResult = await client.query(`
      SELECT label, COUNT(*) as count
      FROM clicks
      GROUP BY label
    `);
    const labelCounts: Record<string, number> = {};
    labelCountsResult.rows.forEach((row: any) => {
      labelCounts[row.label] = Number(row.count);
    });

    // Calculate URL counts
    const urlCountsResult = await client.query(`
      SELECT url, COUNT(*) as count
      FROM clicks
      WHERE url IS NOT NULL
      GROUP BY url
    `);
    const urlCounts: Record<string, number> = {};
    urlCountsResult.rows.forEach((row: any) => {
      urlCounts[row.url] = Number(row.count);
    });

    // Calculate total clicks
    const totalClicksResult = await client.query('SELECT COUNT(*) as count FROM clicks');
    const totalClicks = Number(totalClicksResult.rows[0].count);

    return {
      events,
      categoryCounts,
      labelCounts,
      urlCounts,
      totalClicks
    };
  } catch (error) {
    console.error('Error getting click events:', error);
    return {
      events: [],
      categoryCounts: {},
      labelCounts: {},
      urlCounts: {},
      totalClicks: 0
    };
  } finally {
    client.release();
  }
}
