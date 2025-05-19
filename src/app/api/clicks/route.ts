import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to the JSON file
const dataDir = path.join(process.cwd(), 'data');
const dataFilePath = path.join(dataDir, 'clicks.json');

// Define the structure of a click event
interface ClickEvent {
  category: string;
  label: string;
  url?: string;
  timestamp: string;
}

// Define the structure of the clicks data
interface ClicksData {
  events: ClickEvent[];
  categoryCounts: Record<string, number>;
  labelCounts: Record<string, number>;
  urlCounts: Record<string, number>;
  totalClicks: number;
}

// Initialize the data file if it doesn't exist
function initializeDataFile() {
  // Create the data directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Create the data file if it doesn't exist
  if (!fs.existsSync(dataFilePath)) {
    const initialData: ClicksData = {
      events: [],
      categoryCounts: {},
      labelCounts: {},
      urlCounts: {},
      totalClicks: 0
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
  }
}

// Read the clicks data from the file
function readClicksData(): ClicksData {
  try {
    initializeDataFile();
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading clicks data:', error);
    return {
      events: [],
      categoryCounts: {},
      labelCounts: {},
      urlCounts: {},
      totalClicks: 0
    };
  }
}

// Write the clicks data to the file
function writeClicksData(data: ClicksData) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing clicks data:', error);
  }
}

// Handle POST requests to track clicks
export async function POST(request: NextRequest) {
  try {
    const { category, label, url } = await request.json();

    if (!category || !label) {
      return NextResponse.json(
        { error: 'Category and label are required' },
        { status: 400 }
      );
    }

    // Create a new click event
    const clickEvent: ClickEvent = {
      category,
      label,
      url,
      timestamp: new Date().toISOString()
    };

    // Read the current data
    const data = readClicksData();

    // Update the data
    data.events.push(clickEvent);
    data.totalClicks++;

    // Update category counts
    data.categoryCounts[category] = (data.categoryCounts[category] || 0) + 1;

    // Update label counts
    data.labelCounts[label] = (data.labelCounts[label] || 0) + 1;

    // Update URL counts if URL is provided
    if (url) {
      data.urlCounts[url] = (data.urlCounts[url] || 0) + 1;
    }

    // Write the updated data back to the file
    writeClicksData(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    );
  }
}

// Handle GET requests to retrieve click statistics
export async function GET() {
  try {
    const data = readClicksData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error retrieving click statistics:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve click statistics' },
      { status: 500 }
    );
  }
}
