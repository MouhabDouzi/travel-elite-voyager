import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FilterPanel } from '../components/FilterPanel';
import { MapView } from '../components/MapView';
import { WeatherInfo } from '../components/WeatherInfo';
import { ItineraryPreview } from '../components/ItineraryPreview';
import { AIAssistant } from '../components/AIAssistant';
import { CommunityFeed } from '../components/CommunityFeed';
import { ThemeToggle } from '../components/ThemeToggle';
import { Destination } from '../data/destinations';
import { toast, Toaster } from 'sonner';
import { HeroSection } from '../components/HeroSection';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { TripPurposeSelector } from '../components/TripPurposeSelector';
import { BudgetSlider } from '../components/BudgetSlider';
import { DestinationCard } from '../components/DestinationCard';
import { destinations } from '../data/destinations';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [tripDays, setTripDays] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<'explore' | 'community'>('explore');
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [budget, setBudget] = useState(3000);

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

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold text-travel-blue mb-2">
          Start Your Journey
        </h2>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Tell us about your travel preferences, and we'll find the perfect destinations
          tailored to your budget, desired weather, and trip purpose.
        </p>
        
        {/* Trip Purpose Selector */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">What's the purpose of your trip?</h3>
          <TripPurposeSelector 
            selected={selectedPurpose} 
            onSelect={setSelectedPurpose} 
          />
        </div>
        
        <Separator className="my-10" />
        
        {/* Budget and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-1">
            <BudgetSlider value={budget} onChange={setBudget} />
          </div>
          <div className="lg:col-span-2">
            <MapView
              destinations={filteredDestinations}
              onDestinationSelect={handleDestinationSelect}
              selectedDestination={selectedDestination}
            />
          </div>
        </div>
        
        {/* Tabs for different views */}
        <Tabs defaultValue="discover" className="mt-10">
          <TabsList className="mb-6">
            <TabsTrigger value="discover">Discover Destinations</TabsTrigger>
            <TabsTrigger value="weather">Climate Insights</TabsTrigger>
            <TabsTrigger value="budget">Budget Explorer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <FilterPanel onFilterChange={handleFilterChange} />
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-4">
                  Featured Destinations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destinations.slice(0, 4).map((destination) => (
                    <DestinationCard key={destination.id} destination={destination} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weather">
            {selectedDestination && (
              <WeatherInfo destination={selectedDestination} />
            )}
          </TabsContent>

          <TabsContent value="budget">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Budget Breakdown</h3>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <p className="text-gray-600 mb-4">
                    For a 7-day trip with your budget of <span className="font-semibold text-travel-teal">{
                      new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      }).format(budget)
                    }</span>, you could expect:
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Flight (round-trip)</span>
                      <span className="font-medium">${Math.round(budget * 0.4)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Accommodation (7 nights)</span>
                      <span className="font-medium">${Math.round(budget * 0.35)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Daily expenses (food, transport)</span>
                      <span className="font-medium">${Math.round(budget * 0.15)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Activities & experiences</span>
                      <span className="font-medium">${Math.round(budget * 0.1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Featured Destinations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-travel-blue mb-6">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-travel-blue/5 border-t">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-travel-blue">TravelPlannerElite</h3>
              <p className="text-sm text-gray-600">Smart travel planning for everyone</p>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} TravelPlannerElite. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default HomePage; 