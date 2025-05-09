import axios from 'axios';
import { Destination, TravelRecommendation, WeatherInfo } from '../types/travel';

const API_KEYS = {
  OPENWEATHER: import.meta.env.VITE_OPENWEATHER_API_KEY,
  GEOAPIFY: import.meta.env.VITE_GEOAPIFY_API_KEY,
  OPENCAGE: import.meta.env.VITE_OPENCAGE_API_KEY,
};

interface ScrapedDestination {
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  activities: string[];
  bestTimeToVisit: string;
  averageCost: {
    budget: number;
    midRange: number;
    luxury: number;
  };
  weather: {
    summer: string;
    winter: string;
    spring: string;
    fall: string;
  };
  localTransportation: string[];
  accommodation: {
    budget: string[];
    midRange: string[];
    luxury: string[];
  };
  localCuisine: string[];
  culturalTips: string[];
}

const calculateBestTime = (weatherData: any): string => {
  // Analyze weather data to determine best time to visit
  const monthlyAverages = weatherData.monthly_averages;
  const bestMonths = Object.entries(monthlyAverages)
    .filter(([_, data]: [string, any]) => 
      data.temperature > 15 && 
      data.temperature < 30 && 
      data.rainfall < 100
    )
    .map(([month]) => month);

  return bestMonths.join(', ');
};

const generateLocalTips = (data: any): string[] => {
  return [
    `Best time to visit: ${calculateBestTime(data.weather_data)}`,
    `Local currency: ${data.currency}`,
    `Language: ${data.language}`,
    `Emergency number: ${data.emergency_number}`,
    `Local customs: ${data.local_customs}`,
  ];
};

// Mock data for development
const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    description: 'The City of Light',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3a917209c20e',
    coordinates: {
      lat: 48.8566,
      lng: 2.3522,
    },
    rating: 4.8,
    reviews: 15000,
    priceLevel: 3,
    activities: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'],
    weather: {
      temperature: 20,
      condition: 'Clear',
      description: 'clear sky',
      humidity: 65,
      windSpeed: 5,
    },
  },
  // Add more mock destinations as needed
];

export const travelDataService = {
  async fetchDestinations(filters?: {
    continent?: string;
    budget?: 'budget' | 'midRange' | 'luxury';
    activities?: string[];
    weather?: string;
    duration?: number;
  }): Promise<Destination[]> {
    try {
      // For development, return mock data
      return mockDestinations;
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw new Error('Failed to fetch destinations');
    }
  },

  async fetchWeatherInfo(lat: number, lng: number): Promise<WeatherInfo> {
    try {
      if (!API_KEYS.OPENWEATHER) {
        throw new Error('OpenWeather API key is not configured');
      }

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat,
            lon: lng,
            appid: API_KEYS.OPENWEATHER,
            units: 'metric',
          },
        }
      );

      return {
        temperature: response.data.main.temp,
        condition: response.data.weather[0].main,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      // Return mock weather data if API call fails
      return {
        temperature: 20,
        condition: 'Clear',
        description: 'clear sky',
        humidity: 65,
        windSpeed: 5,
      };
    }
  },

  async fetchTravelRecommendation(destination: string): Promise<TravelRecommendation> {
    try {
      // For development, return mock data
      return {
        destination,
        activities: ['Sightseeing', 'Shopping', 'Dining'],
        bestTime: 'April to October',
        tips: [
          'Best time to visit: April to October',
          'Local currency: EUR',
          'Language: French',
          'Emergency number: 112',
          'Local customs: Greet with kisses on both cheeks',
        ],
        weather: {
          temperature: 20,
          condition: 'Clear',
          description: 'clear sky',
          humidity: 65,
          windSpeed: 5,
        },
        localTransportation: ['Metro', 'Bus', 'Taxi'],
        accommodation: {
          budget: ['Hostels', 'Budget Hotels'],
          midRange: ['3-star Hotels', 'Apartments'],
          luxury: ['5-star Hotels', 'Luxury Apartments'],
        },
        localCuisine: ['Croissants', 'Wine', 'Cheese'],
        culturalTips: ['Dress well', 'Learn basic French phrases'],
      };
    } catch (error) {
      console.error('Error fetching travel recommendation:', error);
      throw new Error('Failed to fetch travel recommendation');
    }
  },
}; 