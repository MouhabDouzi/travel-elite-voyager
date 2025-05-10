import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Globe, Map, Calendar, Users } from 'lucide-react';
import { User } from '@/types/auth';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // user: User | null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">TravelPlannerElite</h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {!user ? (
                <>
                  <Button variant="ghost" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button onClick={() => navigate('/discover')}>
                    Get Started
                  </Button>
                </>
              ) : (
                <Button onClick={() => navigate('/discover')}>
                  Go to Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-travel-blue to-travel-teal bg-clip-text text-transparent">
            Plan Your Perfect Journey
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover amazing destinations, get personalized recommendations, and create unforgettable travel experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/discover')}>
              Start Planning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {!user && (
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Globe className="h-12 w-12 mx-auto mb-4 text-travel-blue" />
              <h3 className="text-xl font-bold mb-2">Global Destinations</h3>
              <p className="text-muted-foreground">
                Explore thousands of destinations worldwide with detailed information and reviews.
              </p>
            </div>
            <div className="text-center">
              <Map className="h-12 w-12 mx-auto mb-4 text-travel-teal" />
              <h3 className="text-xl font-bold mb-2">Smart Planning</h3>
              <p className="text-muted-foreground">
                Get AI-powered recommendations based on your preferences and budget.
              </p>
            </div>
            <div className="text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-travel-coral" />
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">
                Book flights, hotels, and activities all in one place with our integrated system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-16" />

      {/* Community Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-travel-blue" />
          <h2 className="text-3xl font-bold mb-4">Join Our Travel Community</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with fellow travelers, share experiences, and get inspired for your next adventure.
          </p>
          <Button size="lg" onClick={() => navigate('/discover')}>
            Join Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-primary">TravelPlannerElite</h3>
              <p className="text-sm text-muted-foreground">Smart travel planning for everyone</p>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} TravelPlannerElite. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 