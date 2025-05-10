import React from 'react';
import { Card } from '@/components/ui/card';
import { Destination } from '@/data/destinations';

interface ItineraryPreviewProps {
  destination: Destination;
  days: number;
}

export const ItineraryPreview: React.FC<ItineraryPreviewProps> = ({ destination, days }) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Suggested Itinerary</h3>
      
      <div className="space-y-4">
        {Array.from({ length: days }, (_, i) => (
          <div key={i} className="border-b pb-4 last:border-b-0">
            <h4 className="font-medium text-travel-blue">Day {i + 1}</h4>
            <div className="mt-2 space-y-2">
              {destination.activities.map((activity, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{activity.name}</span>
                  <span className="text-sm text-gray-500">{activity.duration}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};