import { Destination } from '@/data/destinations';

export interface FilterCriteria {
  budget: number;
  temperature: [number, number];
  purposes: string[];
  weather: string[];
}

export const filterDestinations = (
  destinations: Destination[],
  criteria: FilterCriteria
): Destination[] => {
  return destinations.filter((destination) => {
    // Budget filter
    if (destination.budget > criteria.budget) {
      return false;
    }

    // Temperature filter
    const [minTemp, maxTemp] = criteria.temperature;
    if (destination.temperature < minTemp || destination.temperature > maxTemp) {
      return false;
    }

    // Purposes filter
    if (criteria.purposes.length > 0) {
      const hasMatchingPurpose = destination.purposes.some((purpose) =>
        criteria.purposes.includes(purpose)
      );
      if (!hasMatchingPurpose) {
        return false;
      }
    }

    // Weather filter
    if (criteria.weather.length > 0) {
      const hasMatchingWeather = destination.weather.some((weather) =>
        criteria.weather.includes(weather)
      );
      if (!hasMatchingWeather) {
        return false;
      }
    }

    return true;
  });
};

export const generateItinerary = (
  destination: Destination,
  days: number
): { day: number; activities: typeof destination.activities }[] => {
  const itinerary: { day: number; activities: typeof destination.activities }[] = [];
  
  // Distribute activities across days
  const activitiesPerDay = Math.ceil(destination.activities.length / days);
  
  for (let day = 1; day <= days; day++) {
    const startIndex = (day - 1) * activitiesPerDay;
    const endIndex = Math.min(startIndex + activitiesPerDay, destination.activities.length);
    
    if (startIndex < destination.activities.length) {
      itinerary.push({
        day,
        activities: destination.activities.slice(startIndex, endIndex)
      });
    }
  }
  
  return itinerary;
}; 