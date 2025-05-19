/**
 * Utility for tracking clicks on links and buttons
 */

// Function to track a click event
export async function trackClick(category: string, label: string, url?: string) {
  try {
    const response = await fetch('/api/clicks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        label,
        url,
      }),
    });

    if (!response.ok) {
      console.error('Failed to track click:', await response.text());
    }

    return response.ok;
  } catch (error) {
    console.error('Error tracking click:', error);
    return false;
  }
}

// Categories for click tracking
export const ClickCategories = {
  NAVIGATION: 'navigation',
  TICKETS: 'tickets',
  SOCIAL: 'social',
  CONTACT: 'contact',
  OTHER: 'other',
};

// Helper function to track navigation clicks
export function trackNavigation(label: string, url?: string) {
  return trackClick(ClickCategories.NAVIGATION, label, url);
}

// Helper function to track ticket clicks
export function trackTicketClick(label: string, url?: string) {
  return trackClick(ClickCategories.TICKETS, label, url);
}

// Helper function to track social media clicks
export function trackSocialClick(label: string, url?: string) {
  return trackClick(ClickCategories.SOCIAL, label, url);
}

// Helper function to track contact clicks
export function trackContactClick(label: string, url?: string) {
  return trackClick(ClickCategories.CONTACT, label, url);
}
