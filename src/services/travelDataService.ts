import axios from 'axios';
import { Destination, TravelRecommendation, WeatherInfo } from '../types/travel';

const API_KEYS = {
  OPENWEATHER: import.meta.env.VITE_OPENWEATHER_API_KEY,
  GEOAPIFY: import.meta.env.VITE_GEOAPIFY_API_KEY,
  OPENCAGE: import.meta.env.VITE_OPENCAGE_API_KEY,
  GOOGLE_PLACES: 'AIzaSyB0YyDTa0qqOjIerob2VTIw_XRrjr7q2oE',
  TRIPADVISOR: 'tripadvisor_api_key_here'
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

export const travelDataService = {
  async fetchDestinations(filters?: {
    continent?: string;
    budget?: 'budget' | 'midRange' | 'luxury';
    activities?: string[];
    weather?: string;
    duration?: number;
  }): Promise<Destination[]> {
    try {
      // Fetch from TripAdvisor API
      const tripAdvisorResponse = await axios.get(
        `https://api.tripadvisor.com/api/v1/locations/search`,
        {
          params: {
            key: API_KEYS.TRIPADVISOR,
            category: 'attractions',
            ...filters,
          },
        }
      );

      // Fetch from Google Places API for additional data
      const destinations = await Promise.all(
        tripAdvisorResponse.data.data.map(async (place: any) => {
          const googleResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json`,
            {
              params: {
                place_id: place.place_id,
                key: API_KEYS.GOOGLE_PLACES,
                fields: 'name,formatted_address,geometry,photos,rating,reviews',
              },
            }
          );

          return {
            id: place.location_id,
            name: place.name,
            country: place.address_string.split(',').pop()?.trim(),
            description: place.description,
            imageUrl: place.photo?.images?.large?.url,
            coordinates: {
              lat: place.latitude,
              lng: place.longitude,
            },
            rating: place.rating,
            reviews: place.num_reviews,
            priceLevel: place.price_level,
            activities: place.activities || [],
            weather: await this.fetchWeatherInfo(place.latitude, place.longitude),
          };
        })
      );

      return destinations;
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
      throw new Error('Failed to fetch weather information');
    }
  },

  async fetchTravelRecommendation(destination: string): Promise<TravelRecommendation> {
    try {
      // Fetch from TripAdvisor API
      const response = await axios.get(
        `https://api.tripadvisor.com/api/v1/location/${destination}/details`,
        {
          params: {
            key: API_KEYS.TRIPADVISOR,
            fields: 'name,description,attractions,reviews,photos',
          },
        }
      );

      // Fetch from Google Places API for additional data
      const googleResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json`,
        {
          params: {
            query: `${response.data.name} tourist attractions`,
            key: API_KEYS.GOOGLE_PLACES,
          },
        }
      );

      return {
        destination: response.data.name,
        activities: googleResponse.data.results.map((place: any) => place.name),
        bestTime: calculateBestTime(response.data.weather_data),
        tips: [
          ...response.data.travel_tips,
          ...generateLocalTips(response.data),
        ],
        weather: await this.fetchWeatherInfo(
          response.data.latitude,
          response.data.longitude
        ),
        localTransportation: response.data.transportation_options,
        accommodation: response.data.accommodation_options,
        localCuisine: response.data.local_food,
        culturalTips: response.data.cultural_tips,
      };
    } catch (error) {
      console.error('Error fetching travel recommendation:', error);
      throw new Error('Failed to fetch travel recommendation');
    }
  },
}; 