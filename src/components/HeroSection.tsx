import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePlanTrip = () => {
    if (!user) {
      toast.error('Please log in to plan a trip');
      navigate('/login');
      return;
    }
    navigate('/dashboard');
  };

  const handleExploreDestinations = () => {
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[85vh] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-hero-pattern bg-cover bg-center"
        style={{ backgroundPosition: 'bottom' }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 text-white">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Discover Your Perfect <span className="text-travel-teal">Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100">
            Personalized travel planning based on your budget, preferences, and real-time conditions.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-travel-teal hover:bg-travel-teal/90 text-white"
              onClick={handlePlanTrip}
            >
              {user ? 'Go to Dashboard' : 'Plan My Trip'}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 border-white hover:bg-white/20"
              onClick={handleExploreDestinations}
            >
              Explore Destinations
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating search panel */}
      <div className="absolute bottom-10 left-0 right-0 container">
        <div className="glass-effect p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-4">Where will your journey take you?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white text-sm mb-2">Trip Purpose</label>
              <select className="w-full rounded-md bg-white/20 border-white/20 text-white p-2">
                <option value="">Select purpose</option>
                <option value="leisure">Leisure</option>
                <option value="business">Business</option>
                <option value="adventure">Adventure</option>
                <option value="romantic">Romantic</option>
                <option value="family">Family</option>
                <option value="culture">Cultural</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm mb-2">Budget Range</label>
              <select className="w-full rounded-md bg-white/20 border-white/20 text-white p-2">
                <option value="">Select budget</option>
                <option value="budget">Budget ($)</option>
                <option value="moderate">Moderate ($$)</option>
                <option value="luxury">Luxury ($$$)</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                className="w-full bg-travel-blue hover:bg-travel-blue/90"
                onClick={handleExploreDestinations}
              >
                Search Destinations
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
