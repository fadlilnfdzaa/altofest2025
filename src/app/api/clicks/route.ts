import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase, addClickEvent, getClickEvents, ClickEvent } from '@/lib/db';

// Environment variables are automatically loaded in API routes

// Initialize the database on first request
let databaseInitialized = false;

// Handle POST requests to track clicks
export async function POST(request: NextRequest) {
  try {
    // Initialize the database if it hasn't been initialized yet
    if (!databaseInitialized) {
      await initializeDatabase();
      databaseInitialized = true;
    }

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

    // Add the click event to the database
    const success = await addClickEvent(clickEvent);

    if (!success) {
      throw new Error('Failed to add click event to database');
    }

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
    // Initialize the database if it hasn't been initialized yet
    if (!databaseInitialized) {
      await initializeDatabase();
      databaseInitialized = true;
    }

    // Get all click events from the database
    const data = await getClickEvents();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error retrieving click statistics:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve click statistics' },
      { status: 500 }
    );
  }
}
