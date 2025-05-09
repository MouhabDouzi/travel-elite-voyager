import axios from 'axios';

const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

export interface GeocodingResult {
  lat: number;
  lng: number;
  formattedAddress: string;
  city: string;
  country: string;
}

export interface POIResult {
  name: string;
  type: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating?: number;
  categories?: string[];
}

export const geocodingService = {
  async getCoordinates(address: string): Promise<GeocodingResult> {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`,
        {
          params: {
            q: address,
            key: OPENCAGE_API_KEY,
            no_annotations: 1,
            language: 'en',
          },
        }
      );

      if (response.data.results.length === 0) {
        throw new Error('No results found');
      }

      const result = response.data.results[0];
      return {
        lat: result.geometry.lat,
        lng: result.geometry.lng,
        formattedAddress: result.formatted,
        city: result.components.city || result.components.town,
        country: result.components.country,
      };
    } catch (error) {
      console.error('Error in geocoding:', error);
      throw new Error('Failed to get coordinates');
    }
  },

  async searchPOI(query: string, lat: number, lng: number, radius: number = 5000): Promise<POIResult[]> {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v2/places`,
        {
          params: {
            categories: 'tourism,entertainment,catering,commercial',
            filter: `circle:${lng},${lat},${radius}`,
            bias: `proximity:${lng},${lat}`,
            limit: 20,
            apiKey: GEOAPIFY_API_KEY,
          },
        }
      );

      return response.data.features.map((feature: any) => ({
        name: feature.properties.name,
        type: feature.properties.type,
        address: feature.properties.address_line2,
        coordinates: {
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
        },
        rating: feature.properties.rating,
        categories: feature.properties.categories,
      }));
    } catch (error) {
      console.error('Error searching POI:', error);
      throw new Error('Failed to search points of interest');
    }
  },
}; 