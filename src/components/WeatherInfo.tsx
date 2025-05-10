import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { travelDataService } from '@/services/travelDataService';
import { Destination } from '@/types/travel';
import { WeatherInfo as WeatherInfoType } from '@/types/travel';
import { Droplets, Wind } from 'lucide-react';

interface WeatherInfoProps {
  destination: Destination;
}

export const WeatherInfo: React.FC<WeatherInfoProps> = ({ destination }) => {
  const [weather, setWeather] = useState<WeatherInfoType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await travelDataService.fetchWeatherInfo(
          destination.coordinates.lat,
          destination.coordinates.lng
        );
        setWeather(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [destination]);

  if (loading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="p-4">
        <div className="text-red-500">{error || 'Weather data unavailable'}</div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div>
          <div className="text-lg font-semibold">{destination.name}</div>
          <div className="text-sm text-gray-500">{destination.country}</div>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Droplets className="h-4 w-4 text-blue-400" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind className="h-4 w-4 text-gray-400" />
            <span>{weather.windSpeed} m/s</span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-2xl font-bold">
        {weather.temperature}°C - {weather.condition}
      </div>
      <div className="text-gray-600 mt-2">{weather.description}</div>
    </Card>
  );
}; 