import axios from 'axios';
import { Destination } from '@/data/destinations';
import { WeatherInfo } from '@/types/travel';

const API_KEYS = {
  OPENWEATHER: '340aade475a3a32e534f140253953d42',
  GEOAPIFY: '8005e58de5eb4f1ba187caad6284e1b3',
  OPENCAGE: '0631966cca624a7aaef3cba10f77e6cc',
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
    name: 'Bali, Indonesia',
    description: 'Tropical paradise with beautiful beaches and rich culture',
    latitude: -8.4095,
    longitude: 115.1889,
    budget: 1500,
    temperature: 28,
    purposes: ['Leisure', 'Adventure', 'Romantic'],
    weather: ['Sunny', 'Rainy'],
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    activities: [
      { name: 'Visit Ubud Monkey Forest', duration: '2 hours', cost: 20 },
      { name: 'Tegallalang Rice Terraces', duration: '3 hours', cost: 15 },
      { name: 'Uluwatu Temple', duration: '2 hours', cost: 10 },
      { name: 'Beach Day at Kuta', duration: 'Full day', cost: 30 },
    ]
  },
  {
    id: '2',
    name: 'Paris, France',
    description: 'City of love, art, and exquisite cuisine',
    latitude: 48.8566,
    longitude: 2.3522,
    budget: 2500,
    temperature: 15,
    purposes: ['Romantic', 'Culture', 'Leisure'],
    weather: ['Cloudy', 'Rainy'],
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3a917209c20e',
    activities: [
      { name: 'Eiffel Tower Visit', duration: '3 hours', cost: 30 },
      { name: 'Louvre Museum', duration: '4 hours', cost: 20 },
      { name: 'Seine River Cruise', duration: '1 hour', cost: 25 },
      { name: 'Notre-Dame Cathedral', duration: '2 hours', cost: 0 },
    ]
  }
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

  async fetchTravelRecommendation(destination: string): Promise<{
    destination: string;
    activities: string[];
    bestTime: string;
    tips: string[];
    weather: WeatherInfo;
    localTransportation: string[];
    accommodation: string[];
    localCuisine: string[];
    culturalTips: string[];
  }> {
    try {
      // For development, return mock data
      return {
        destination,
        activities: ['Sightseeing', 'Shopping', 'Dining'],
        bestTime: 'April to October',
        tips: [
          'Best time to visit: April to October',
          'Local currency: EUR',
          'Language: Local language',
          'Emergency number: 112',
          'Local customs: Respect local traditions',
        ],
        weather: {
          temperature: 20,
          condition: 'Clear',
          description: 'clear sky',
          humidity: 65,
          windSpeed: 5,
        },
        localTransportation: ['Public Transport', 'Taxis', 'Rental Cars'],
        accommodation: ['Hotels', 'Apartments', 'Hostels'],
        localCuisine: ['Local specialties', 'Street food', 'Fine dining'],
        culturalTips: ['Dress appropriately', 'Learn basic phrases'],
      };
    } catch (error) {
      console.error('Error fetching travel recommendation:', error);
      throw new Error('Failed to fetch travel recommendation');
    }
  },
}; 