import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { getWeatherForLocation, getWeatherIconUrl, WeatherData } from '../lib/weatherService';
import { Destination } from '../data/destinations';
import { Droplets, Wind } from 'lucide-react';
import { toast } from 'sonner';

interface WeatherInfoProps {
  destination: Destination;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ destination }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        toast.loading('Fetching weather data...');
        const data = await getWeatherForLocation(destination.latitude, destination.longitude);
        setWeather(data);
        setError(null);
        toast.success('Weather data updated');
      } catch (err) {
        setError('Failed to fetch weather data');
        toast.error('Failed to fetch weather data');
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
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-travel-blue">Current Weather</h3>
        <img
          src={getWeatherIconUrl(weather.icon)}
          alt={weather.description}
          className="w-12 h-12"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Temperature</span>
          <span className="font-medium">{weather.temperature}°C</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Conditions</span>
          <span className="font-medium capitalize">{weather.description}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Humidity</span>
          <div className="flex items-center gap-1">
            <Droplets className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{weather.humidity}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Wind Speed</span>
          <div className="flex items-center gap-1">
            <Wind className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{weather.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeatherInfo; 