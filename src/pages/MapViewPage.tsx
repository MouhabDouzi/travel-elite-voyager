import UserNav from '@/components/user/UserNav';
import { MapView } from '@/components/MapView';
import { Destination } from '@/data/destinations';
import { travelDataService } from '@/services/travelDataService';
import { useState, useEffect } from 'react';

export default function MapViewPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setLoading(true);
        const results = await travelDataService.fetchDestinations();
        setDestinations(results);
      } catch (error) {
        setError('Failed to load destinations');
        console.error('Error loading destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDestinations();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <UserNav />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Explore Destinations</h1>
          
          {error && (
            <div className="bg-destructive/10 text-destructive px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {!loading && (
            <MapView
              destinations={destinations}
              onDestinationSelect={setSelectedDestination}
              selectedDestination={selectedDestination}
            />
          )}
        </div>
      </div>
    </div>
  );
} 