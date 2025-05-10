import axios from 'axios';
import { Destination, WeatherInfo } from '@/types/travel';

const API_KEYS = {
  OPENWEATHER: '340aade475a3a32e534f140253953d42',
  GEOAPIFY: '8005e58de5eb4f1ba187caad6284e1b3',
  OPENCAGE: '0631966cca624a7aaef3cba10f77e6cc',
};

// Mock data for fallback
const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Bali, Indonesia',
    country: 'Indonesia',
    description: 'Tropical paradise with beautiful beaches and rich culture',
    coordinates: {
      lat: -8.4095,
      lng: 115.1889
    },
    rating: 4.5,
    reviews: 1200,
    priceLevel: 2,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    activities: ['Beach', 'Culture', 'Adventure'],
    weather: {
      temperature: 28,
      condition: 'Sunny',
      description: 'clear sky',
      humidity: 75,
      windSpeed: 5
    }
  },
  {
    id: '2',
    name: 'Paris, France',
    country: 'France',
    description: 'City of love, art, and exquisite cuisine',
    coordinates: {
      lat: 48.8566,
      lng: 2.3522
    },
    rating: 4.8,
    reviews: 2500,
    priceLevel: 3,
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3a917209c20e',
    activities: ['Culture', 'Food', 'Shopping'],
    weather: {
      temperature: 15,
      condition: 'Cloudy',
      description: 'scattered clouds',
      humidity: 65,
      windSpeed: 3
    }
  }
];

export const travelDataService = {
  async fetchDestinations(_filters?: {
    continent?: string;
    budget?: 'budget' | 'midRange' | 'luxury';
    activities?: string[];
    weather?: string;
    duration?: number;
    query?: string;
  }): Promise<Destination[]> {
    try {
      // Use Geoapify Places API to search for real destinations
      const geoapifyUrl = `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=countrycode:FR&limit=10&apiKey=${API_KEYS.GEOAPIFY}`;
      const response = await axios.get(geoapifyUrl);
      const features = response.data.features || [];
      if (features.length === 0) return mockDestinations;
      // Map Geoapify results to Destination type
      return features.map((f: any, idx: number) => ({
        id: f.properties.place_id || String(idx),
        name: f.properties.name || f.properties.address_line1 || 'Unknown',
        country: f.properties.country || 'Unknown',
        description: f.properties.categories?.join(', ') || 'Tourist attraction',
        coordinates: {
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0]
        },
        rating: 4.0,
        reviews: Math.floor(Math.random() * 1000),
        priceLevel: Math.floor(Math.random() * 3) + 1,
        imageUrl: f.properties.datasource?.raw?.image || 'https://images.unsplash.com/photo-1502602898657-3a917209c20e',
        activities: ['Sightseeing', 'Culture'],
        weather: {
          temperature: 20,
          condition: 'Clear',
          description: 'clear sky',
          humidity: 65,
          windSpeed: 5
        }
      }));
    } catch (error) {
      console.error('Error fetching destinations from Geoapify:', error);
      return mockDestinations;
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
      // Use OpenCage to get location info
      const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(destination)}&key=${API_KEYS.OPENCAGE}`;
      const openCageRes = await axios.get(openCageUrl);
      const loc = openCageRes.data.results[0]?.geometry;
      // Use OpenWeather for real weather
      let weather: WeatherInfo = {
        temperature: 20,
        condition: 'Clear',
        description: 'clear sky',
        humidity: 65,
        windSpeed: 5,
      };
      if (loc) {
        weather = await travelDataService.fetchWeatherInfo(loc.lat, loc.lng);
      }
      // Use Geoapify for POIs/activities
      const geoapifyUrl = `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=rect:${loc?.lng-0.1},${loc?.lat-0.1},${loc?.lng+0.1},${loc?.lat+0.1}&limit=5&apiKey=${API_KEYS.GEOAPIFY}`;
      const geoapifyRes = loc ? await axios.get(geoapifyUrl) : { data: { features: [] } };
      const activities = geoapifyRes.data.features.map((f: any) => f.properties.name || 'Tourist spot');
      return {
        destination,
        activities: activities.length ? activities : ['Sightseeing', 'Shopping', 'Dining'],
        bestTime: 'April to October',
        tips: [
          'Best time to visit: April to October',
          'Local currency: EUR',
          'Language: Local language',
          'Emergency number: 112',
          'Local customs: Respect local traditions',
        ],
        weather,
        localTransportation: ['Public Transport', 'Taxis', 'Rental Cars'],
        accommodation: ['Hotels', 'Apartments', 'Hostels'],
        localCuisine: ['Local specialties', 'Street food', 'Fine dining'],
        culturalTips: ['Dress appropriately', 'Learn basic phrases'],
      };
    } catch (error) {
      console.error('Error fetching travel recommendation:', error);
      // Fallback to mock data
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
    }
  },
}; 