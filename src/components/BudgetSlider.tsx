import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const BudgetSlider: React.FC<BudgetSliderProps> = ({ value, onChange }) => {
  // Format as currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Get budget category text
  const getBudgetCategory = (val: number): string => {
    if (val < 1500) return 'Budget-friendly';
    if (val < 3000) return 'Mid-range';
    if (val < 5000) return 'Premium';
    return 'Luxury';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <DollarSign className="h-5 w-5 mr-1 text-travel-teal" />
          Travel Budget
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-2">
          <div className="text-2xl font-bold gradient-text">{formatCurrency(value)}</div>
          <div className="text-sm text-gray-500">{getBudgetCategory(value)}</div>
        </div>
        
        <div className="px-2">
          <Slider
            defaultValue={[value]}
            max={10000}
            min={500}
            step={100}
            className="mt-4"
            onValueChange={(values) => onChange(values[0])}
          />
          
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>$500</span>
            <span>$10,000+</span>
          </div>
          
          <div className="mt-6 text-sm text-gray-600">
            <p className="mb-2">This budget typically covers:</p>
            <ul className="space-y-1 pl-5 list-disc">
              <li>Round-trip flights</li>
              <li>7 nights of accommodation</li>
              <li>Daily meals and local transportation</li>
              <li>Activities and attractions</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
