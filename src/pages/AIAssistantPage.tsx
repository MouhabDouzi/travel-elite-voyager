import UserNav from '@/components/user/UserNav';
import { AIAssistant } from '@/components/AIAssistant';
import { Destination } from '@/types/travel';
import { useState, useEffect } from 'react';
import { travelDataService } from '@/services/travelDataService';

export default function AIAssistantPage() {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecentDestination = async () => {
      try {
        setLoading(true);
        const destinations = await travelDataService.fetchDestinations();
        if (destinations.length > 0) {
          setSelectedDestination(destinations[0]);
        }
      } catch (error) {
        setError('Failed to load destination');
        console.error('Error loading destination:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentDestination();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <UserNav />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">AI Travel Assistant</h1>
          
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

          {!loading && selectedDestination && (
            <AIAssistant
              destination={selectedDestination}
              weather={selectedDestination.weather}
            />
          )}
        </div>
      </div>
    </div>
  );
} 