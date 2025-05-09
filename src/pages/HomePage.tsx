import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import FilterPanel from '@/components/FilterPanel';
import MapView from '@/components/MapView';
import WeatherInfo from '@/components/WeatherInfo';
import ItineraryPreview from '@/components/ItineraryPreview';
import AIAssistant from '@/components/AIAssistant';
import CommunityFeed from '@/components/CommunityFeed';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Destination } from '@/data/destinations';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import HeroSection from '@/components/HeroSection';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [tripDays, setTripDays] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<'explore' | 'community'>('explore');

  const handleFilterChange = (destinations: Destination[]) => {
    setFilteredDestinations(destinations);
    if (selectedDestination && !destinations.includes(selectedDestination)) {
      setSelectedDestination(null);
      toast.info('Selected destination was filtered out');
    }
  };

  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination);
    toast.success(`Selected ${destination.name}`);
  };

  const handleTripDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 14) {
      setTripDays(value);
      toast.info(`Trip duration updated to ${value} days`);
    }
  };

  const handlePlanTrip = () => {
    if (!user) {
      toast.error('Please log in to plan a trip');
      navigate('/login');
      return;
    }
    if (!selectedDestination) {
      toast.error('Please select a destination first');
      return;
    }
    navigate('/my-trips');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" />
      
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">TravelPlannerElite</h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="text-foreground hover:text-primary"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate('/my-trips')}
                    className="text-foreground hover:text-primary"
                  >
                    My Trips
                  </button>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => navigate('/admin')}
                      className="text-foreground hover:text-primary"
                    >
                      Admin
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'explore'
                  ? 'bg-travel-blue text-white'
                  : 'text-gray-600 hover:text-travel-blue'
              }`}
            >
              Explore Destinations
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-4 py-2 rounded-md ${
                activeTab === 'community'
                  ? 'bg-travel-blue text-white'
                  : 'text-gray-600 hover:text-travel-blue'
              }`}
            >
              Travel Community
            </button>
          </div>
        </div>

        {activeTab === 'explore' ? (
          <div id="destinations" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Filters */}
            <div className="lg:col-span-1 space-y-6">
              <FilterPanel onFilterChange={handleFilterChange} />
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <label htmlFor="tripDays" className="block text-sm font-medium text-gray-700 mb-2">
                  Trip Duration (Days)
                </label>
                <input
                  type="number"
                  id="tripDays"
                  min="1"
                  max="14"
                  value={tripDays}
                  onChange={handleTripDaysChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-teal focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Column - Map and Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <MapView
                  destinations={filteredDestinations}
                  onDestinationSelect={handleDestinationSelect}
                  selectedDestination={selectedDestination}
                />
              </div>

              {selectedDestination && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <WeatherInfo destination={selectedDestination} />
                  <ItineraryPreview
                    destination={selectedDestination}
                    days={tripDays}
                  />
                  <div className="md:col-span-2">
                    <button
                      onClick={handlePlanTrip}
                      className="w-full bg-travel-blue text-white px-6 py-3 rounded-md hover:bg-travel-teal transition-colors"
                    >
                      Plan This Trip
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <CommunityFeed />
        )}
      </main>

      <AIAssistant />
    </div>
  );
};

export default HomePage; 