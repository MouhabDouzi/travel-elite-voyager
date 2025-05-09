export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviews: number;
  priceLevel: number;
  activities: string[];
  weather: WeatherInfo;
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
}

export interface TravelRecommendation {
  destination: string;
  activities: string[];
  bestTime: string;
  tips: string[];
  weather: WeatherInfo;
  localTransportation: string[];
  accommodation: string[];
  localCuisine: string[];
  culturalTips: string[];
} 