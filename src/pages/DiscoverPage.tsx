import { useAuth } from '@/contexts/AuthContext';
import UserNav from '@/components/user/UserNav';
import { FilterPanel } from '@/components/FilterPanel';
import { MapView } from '@/components/MapView';
import { WeatherInfo } from '@/components/WeatherInfo';
import { Destination } from '@/types/travel';
import { travelDataService } from '@/services/travelDataService';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DiscoverPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [tripDays, setTripDays] = useState<number>(7);
  const [selectedPurpose, setSelectedPurpose] = useState<string>('');
  const [budget, setBudget] = useState<number>(1000);
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

  const handleFilterChange = useCallback(async (filters: {
    continent?: string;
    budget?: 'budget' | 'midRange' | 'luxury';
    activities?: string[];
    weather?: string;
    duration?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const results = await travelDataService.fetchDestinations(filters);
      setDestinations(results);
    } catch (error) {
      setError('Failed to fetch destinations');
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePlanTrip = useCallback(async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!selectedDestination) {
      setError('Please select a destination first');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to plan trip. Please try again.');
      console.error('Error planning trip:', error);
    } finally {
      setLoading(false);
    }
  }, [user, selectedDestination, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <UserNav />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <FilterPanel
              onFilterChange={handleFilterChange}
              onTripDaysChange={setTripDays}
              onPlanTrip={handlePlanTrip}
              selectedDestination={selectedDestination}
              tripDays={tripDays}
              selectedPurpose={selectedPurpose}
              setSelectedPurpose={setSelectedPurpose}
              budget={budget}
              setBudget={setBudget}
              loading={loading}
            />
          </div>
          <div className="w-full lg:w-3/4">
            <div className="bg-card rounded-lg shadow-lg p-6">
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
                <>
                  <MapView
                    destinations={destinations}
                    onDestinationSelect={setSelectedDestination}
                    selectedDestination={selectedDestination}
                  />
                  {selectedDestination && (
                    <div className="mt-6">
                      <WeatherInfo destination={selectedDestination} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 