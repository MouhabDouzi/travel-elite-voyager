
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  DollarSign, 
  Thermometer, 
  Sun, 
  CloudRain,
  Globe 
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const FilterPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-travel-blue mb-4">Refine Your Search</h2>
      
      <Separator className="my-4" />
      
      <div className="space-y-6">
        {/* Budget Filter */}
        <div>
          <div className="flex items-center mb-2">
            <DollarSign className="h-4 w-4 mr-2 text-travel-teal" />
            <Label className="text-sm font-medium">Budget Range</Label>
          </div>
          <div className="mb-1 flex justify-between text-sm text-gray-500">
            <span>$500</span>
            <span>$10,000+</span>
          </div>
          <Slider defaultValue={[2500]} max={10000} min={500} step={100} />
          <div className="mt-2 text-center text-sm font-medium">$2,500</div>
        </div>
        
        {/* Temperature */}
        <div>
          <div className="flex items-center mb-2">
            <Thermometer className="h-4 w-4 mr-2 text-travel-teal" />
            <Label className="text-sm font-medium">Temperature (°C)</Label>
          </div>
          <div className="mb-1 flex justify-between text-sm text-gray-500">
            <span>0°C</span>
            <span>40°C</span>
          </div>
          <Slider defaultValue={[15, 30]} max={40} min={0} step={1} />
          <div className="mt-2 text-center text-sm font-medium">15°C - 30°C</div>
        </div>
        
        {/* Trip Purpose */}
        <div>
          <div className="flex items-center mb-2">
            <Globe className="h-4 w-4 mr-2 text-travel-teal" />
            <Label className="text-sm font-medium">Trip Purpose</Label>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button variant="outline" className="justify-start" size="sm">Leisure</Button>
            <Button variant="outline" className="justify-start" size="sm">Business</Button>
            <Button variant="outline" className="justify-start" size="sm">Adventure</Button>
            <Button variant="outline" className="justify-start" size="sm">Romantic</Button>
            <Button variant="outline" className="justify-start" size="sm">Family</Button>
            <Button variant="outline" className="justify-start" size="sm">Culture</Button>
          </div>
        </div>
        
        {/* Weather */}
        <div>
          <div className="flex items-center mb-2">
            <Sun className="h-4 w-4 mr-2 text-travel-teal" />
            <Label className="text-sm font-medium">Weather Preference</Label>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button variant="outline" className="justify-start" size="sm">Sunny</Button>
            <Button variant="outline" className="justify-start" size="sm">Cloudy</Button>
            <Button variant="outline" className="justify-start" size="sm">Rainy</Button>
            <Button variant="outline" className="justify-start" size="sm">Snowy</Button>
          </div>
        </div>
        
        <Button className="w-full mt-4 bg-travel-teal hover:bg-travel-teal/90">Apply Filters</Button>
      </div>
    </div>
  );
};

export default FilterPanel;
