import { Destination } from '@/data/destinations';

export const generateItinerary = async (
  destination: Destination,
  days: number
): Promise<string[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const activities = destination.activities;
  const itinerary: string[] = [];

  for (let day = 1; day <= days; day++) {
    const dayActivities = activities.filter((_, index) => index % days === day - 1);
    const dayPlan = dayActivities
      .map((activity) => `${activity.name} (${activity.duration}, $${activity.cost})`)
      .join(' → ');
    itinerary.push(dayPlan || 'Free time to explore local attractions');
  }

  return itinerary;
}; 