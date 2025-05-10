import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { FilterPanel } from '@/components/FilterPanel';
import { MapView } from '@/components/MapView';
import { WeatherInfo } from '@/components/WeatherInfo';
import { Destination } from '@/data/destinations';
import { travelDataService } from '@/services/travelDataService';

type TabType = 'discover' | 'weather' | 'budget';

export const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('discover');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [tripDays, setTripDays] = useState<number>(7);
  const [selectedPurpose, setSelectedPurpose] = useState<string>('');
  const [budget, setBudget] = useState<number>(1000);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial destinations
  useEffect(() => {
    const loadInitialDestinations = async () => {
      try {
        setLoading(true);
        const results = await travelDataService.fetchDestinations();
        setDestinations(results);
      } catch (error) {
        setError('Failed to load destinations. Please try again.');
        console.error('Error loading destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialDestinations();
  }, []);

  const handleTripDaysChange = useCallback((days: number) => {
    setTripDays(days);
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
      const recommendation = await travelDataService.fetchTravelRecommendation(
        selectedDestination.name
      );
      navigate('/trip-planner', { state: { recommendation } });
    } catch (error) {
      setError('Failed to plan trip. Please try again.');
      console.error('Error planning trip:', error);
    } finally {
      setLoading(false);
    }
  }, [user, selectedDestination, navigate]);

  const handleDestinationSelect = useCallback((destination: Destination) => {
    setSelectedDestination(destination);
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
      setError('Failed to fetch destinations. Please try again.');
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <FilterPanel
              onFilterChange={handleFilterChange}
              onTripDaysChange={handleTripDaysChange}
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
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex space-x-4 mb-6">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'discover'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveTab('discover')}
                >
                  Discover
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'weather'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveTab('weather')}
                >
                  Weather
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === 'budget'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveTab('budget')}
                >
                  Budget
                </button>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              {!loading && activeTab === 'discover' && (
                <MapView
                  destinations={destinations}
                  onDestinationSelect={handleDestinationSelect}
                  selectedDestination={selectedDestination}
                />
              )}

              {!loading && activeTab === 'weather' && selectedDestination && (
                <WeatherInfo
                  destination={selectedDestination}
                />
              )}

              {!loading && activeTab === 'budget' && selectedDestination && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Budget Planning</h3>
                  <p>Selected Budget: ${budget}</p>
                  <p>Trip Duration: {tripDays} days</p>
                  <p>Daily Budget: ${Math.round(budget / tripDays)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 