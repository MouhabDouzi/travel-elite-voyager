import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import UserNav from '@/components/user/UserNav';
import { User } from '@/types/auth';

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  weather: {
    temperature: number;
    condition: string;
  };
}

export default function MyTripsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      // In a real app, this would be an API call
      const mockTrips: Trip[] = [
        {
          id: '1',
          destination: 'Paris, France',
          startDate: '2024-04-15',
          endDate: '2024-04-20',
          status: 'upcoming',
          weather: {
            temperature: 18,
            condition: 'Sunny',
          },
        },
        {
          id: '2',
          destination: 'Tokyo, Japan',
          startDate: '2024-03-01',
          endDate: '2024-03-10',
          status: 'ongoing',
          weather: {
            temperature: 22,
            condition: 'Cloudy',
          },
        },
        {
          id: '3',
          destination: 'New York, USA',
          startDate: '2024-02-01',
          endDate: '2024-02-05',
          status: 'completed',
          weather: {
            temperature: 5,
            condition: 'Snowy',
          },
        },
      ];

      setTrips(mockTrips);
    } catch (error) {
      toast.error('Failed to fetch trips');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTrip = async (tripId: string) => {
    try {
      // In a real app, this would be an API call
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
      toast.success('Trip deleted successfully');
    } catch (error) {
      toast.error('Failed to delete trip');
    }
  };

  const filteredTrips = trips.filter((trip) => {
    if (filter === 'all') return true;
    return trip.status === filter;
  });

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNav />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">My Trips</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your upcoming and past trips.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All Trips
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === 'upcoming'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('ongoing')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === 'ongoing'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Ongoing
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  filter === 'completed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading trips...</p>
            </div>
          ) : filteredTrips.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No trips found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by planning a new trip.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Plan New Trip
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        {trip.destination}
                      </h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          trip.status === 'upcoming'
                            ? 'bg-blue-100 text-blue-800'
                            : trip.status === 'ongoing'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Start Date</span>
                        <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>End Date</span>
                        <span>{new Date(trip.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>Weather</span>
                        <span>
                          {trip.weather.temperature}°C, {trip.weather.condition}
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        onClick={() => navigate(`/trip/${trip.id}`)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View Details
                      </button>
                      {trip.status === 'upcoming' && (
                        <button
                          onClick={() => handleDeleteTrip(trip.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Cancel Trip
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 