import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Destination } from '@/data/destinations';

interface FilterPanelProps {
  onFilterChange: (filters: {
    continent?: string;
    budget?: 'budget' | 'midRange' | 'luxury';
    activities?: string[];
    weather?: string;
    duration?: number;
  }) => void;
  onTripDaysChange: (days: number) => void;
  onPlanTrip: () => void;
  selectedDestination: Destination | null;
  tripDays: number;
  selectedPurpose: string;
  setSelectedPurpose: (purpose: string) => void;
  budget: number;
  setBudget: (budget: number) => void;
  loading: boolean;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  onFilterChange,
  onTripDaysChange,
  onPlanTrip,
  selectedDestination,
  tripDays,
  selectedPurpose,
  setSelectedPurpose,
  budget,
  setBudget,
  loading,
}) => {
  const [temperature, setTemperature] = useState<[number, number]>([0, 40]);
  const [purposes, setPurposes] = useState<string[]>([]);
  const [weather, setWeather] = useState<string[]>([]);

  const handleFilterChange = () => {
    onFilterChange({
      budget: budget < 1000 ? 'budget' : budget < 3000 ? 'midRange' : 'luxury',
      activities: purposes,
      weather: weather[0],
      duration: tripDays,
    });
  };

  React.useEffect(() => {
    handleFilterChange();
  }, [budget, temperature, purposes, weather, tripDays]);

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

        {/* Trip Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trip Duration: {tripDays} days
          </label>
          <Slider
            value={[tripDays]}
            onValueChange={(value) => onTripDaysChange(value[0])}
            min={1}
            max={30}
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

        {/* Plan Trip Button */}
        <button
          onClick={onPlanTrip}
          disabled={!selectedDestination || loading}
          className={`w-full py-2 px-4 rounded-lg ${
            selectedDestination && !loading
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? 'Planning...' : 'Plan Trip'}
        </button>
      </div>
    </Card>
  );
};
