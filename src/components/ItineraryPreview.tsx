import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Destination } from '@/data/destinations';
import { generateItinerary } from '@/lib/itineraryService';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface ItineraryPreviewProps {
  destination: Destination;
  days: number;
}

const ItineraryPreview: React.FC<ItineraryPreviewProps> = ({ destination, days }) => {
  const [itinerary, setItinerary] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateNewItinerary = async () => {
      try {
        setLoading(true);
        toast.loading('Generating itinerary...');
        const newItinerary = await generateItinerary(destination, days);
        setItinerary(newItinerary);
        toast.success('Itinerary updated');
      } catch (error) {
        console.error('Error generating itinerary:', error);
        toast.error('Failed to generate itinerary');
      } finally {
        setLoading(false);
      }
    };

    generateNewItinerary();
  }, [destination, days]);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          {[...Array(days)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold text-travel-blue mb-4">
        {days}-Day Itinerary for {destination.name}
      </h2>
      <div className="space-y-4">
        {itinerary.map((activity, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg border border-gray-100 hover:border-travel-teal transition-colors"
          >
            <h3 className="font-medium text-travel-teal mb-2">Day {index + 1}</h3>
            <p className="text-gray-600">{activity}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ItineraryPreview; 