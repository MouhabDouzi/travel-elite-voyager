
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Thermometer, DollarSign } from "lucide-react";
import { type Destination } from "@/data/destinations";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  // Helper function to display price level
  const getPriceDisplay = (level: number) => {
    return Array(5)
      .fill('$')
      .map((dollar, i) => (
        <span 
          key={i} 
          className={i < level ? 'text-travel-teal' : 'text-gray-300'}
        >
          $
        </span>
      ));
  };

  // Helper function to get weather icon
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      case 'snowy': return '❄️';
      default: return '🌤️';
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg border-gray-200">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={destination.imageUrl} 
          alt={destination.name}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <CardContent className="p-5 flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">{destination.name}</h3>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {destination.country}
            </div>
          </div>
          <div className="flex">
            {getPriceDisplay(destination.priceLevel)}
          </div>
        </div>
        
        <p className="text-gray-600 mt-3 text-sm line-clamp-2">
          {destination.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {destination.bestFor.map((category) => (
            <Badge 
              key={category} 
              variant="outline"
              className="bg-travel-blue/5 text-travel-blue border-travel-blue/20"
            >
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Thermometer className="h-3 w-3 mr-1 text-travel-teal" />
            <span>
              {destination.weather.temp.min}°-{destination.weather.temp.max}°C
            </span>
            <span className="ml-1">{getWeatherIcon(destination.weather.condition)}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-3 w-3 mr-1 text-travel-coral" />
            <span>${destination.budget.dailyExpenses}/day</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 border-t">
        <Button
          className="w-full bg-travel-blue hover:bg-travel-blue/90"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
