import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Destination, destinations } from '@/data/destinations';
import { filterDestinations } from '@/lib/filterService';

interface FilterPanelProps {
  onFilterChange: (destinations: Destination[]) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [budget, setBudget] = useState<number>(1000);
  const [temperature, setTemperature] = useState<[number, number]>([0, 40]);
  const [purposes, setPurposes] = useState<string[]>([]);
  const [weather, setWeather] = useState<string[]>([]);

  const handleFilterChange = () => {
    const filtered = filterDestinations(destinations, {
      budget,
      temperature,
      purposes,
      weather,
    });
    onFilterChange(filtered);
  };

  React.useEffect(() => {
    handleFilterChange();
  }, [budget, temperature, purposes, weather]);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-travel-blue mb-6">Filter Destinations</h2>

      <div className="space-y-6">
        {/* Budget Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Budget: ${budget}
          </label>
          <Slider
            value={[budget]}
            onValueChange={(value) => setBudget(value[0])}
            min={0}
            max={5000}
            step={100}
            className="w-full"
          />
        </div>

        {/* Temperature Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temperature Range: {temperature[0]}°C - {temperature[1]}°C
          </label>
          <Slider
            value={temperature}
            onValueChange={(value: [number, number]) => setTemperature(value)}
            min={-20}
            max={50}
            step={1}
            className="w-full"
          />
        </div>

        {/* Travel Purposes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Travel Purposes
          </label>
          <div className="space-y-2">
            {['Beach', 'Mountain', 'City', 'Cultural', 'Adventure'].map((purpose) => (
              <div key={purpose} className="flex items-center space-x-2">
                <Checkbox
                  id={purpose}
                  checked={purposes.includes(purpose)}
                  onCheckedChange={(checked) => {
                    setPurposes((prev) =>
                      checked
                        ? [...prev, purpose]
                        : prev.filter((p) => p !== purpose)
                    );
                  }}
                />
                <label
                  htmlFor={purpose}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {purpose}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weather Preferences
          </label>
          <div className="space-y-2">
            {['Sunny', 'Rainy', 'Snowy', 'Cloudy'].map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox
                  id={condition}
                  checked={weather.includes(condition)}
                  onCheckedChange={(checked) => {
                    setWeather((prev) =>
                      checked
                        ? [...prev, condition]
                        : prev.filter((w) => w !== condition)
                    );
                  }}
                />
                <label
                  htmlFor={condition}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {condition}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
