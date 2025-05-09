import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import AdminNav from '@/components/admin/AdminNav';

interface Destination {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  budget: number;
  activities: Array<{
    name: string;
    duration: number;
    cost: number;
  }>;
}

export default function AdminDestinations() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isAddingDestination, setIsAddingDestination] = useState(false);
  const [newDestination, setNewDestination] = useState<Partial<Destination>>({
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
    budget: 0,
    activities: [],
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      // In a real app, this would be an API call
      const mockDestinations: Destination[] = [
        {
          id: '1',
          name: 'Bali',
          description: 'Tropical paradise with beautiful beaches',
          latitude: -8.409518,
          longitude: 115.188919,
          budget: 1000,
          activities: [
            { name: 'Beach Visit', duration: 4, cost: 0 },
            { name: 'Temple Tour', duration: 3, cost: 20 },
          ],
        },
        // Add more mock destinations as needed
      ];

      setDestinations(mockDestinations);
    } catch (error) {
      toast.error('Failed to fetch destinations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDestination = async () => {
    try {
      // In a real app, this would be an API call
      const newId = (destinations.length + 1).toString();
      const destination: Destination = {
        id: newId,
        name: newDestination.name || '',
        description: newDestination.description || '',
        latitude: newDestination.latitude || 0,
        longitude: newDestination.longitude || 0,
        budget: newDestination.budget || 0,
        activities: newDestination.activities || [],
      };

      setDestinations([...destinations, destination]);
      setIsAddingDestination(false);
      setNewDestination({
        name: '',
        description: '',
        latitude: 0,
        longitude: 0,
        budget: 0,
        activities: [],
      });
      toast.success('Destination added successfully');
    } catch (error) {
      toast.error('Failed to add destination');
    }
  };

  const handleDeleteDestination = async (id: string) => {
    try {
      // In a real app, this would be an API call
      setDestinations(destinations.filter((d) => d.id !== id));
      toast.success('Destination deleted successfully');
    } catch (error) {
      toast.error('Failed to delete destination');
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Manage Destinations
            </h1>
            <button
              onClick={() => setIsAddingDestination(true)}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Destination
            </button>
          </div>

          {isAddingDestination && (
            <div className="bg-white shadow sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add New Destination
                </h3>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={newDestination.name}
                      onChange={(e) =>
                        setNewDestination({
                          ...newDestination,
                          name: e.target.value,
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Budget
                    </label>
                    <input
                      type="number"
                      name="budget"
                      id="budget"
                      value={newDestination.budget}
                      onChange={(e) =>
                        setNewDestination({
                          ...newDestination,
                          budget: Number(e.target.value),
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={3}
                      value={newDestination.description}
                      onChange={(e) =>
                        setNewDestination({
                          ...newDestination,
                          description: e.target.value,
                        })
                      }
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-5 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsAddingDestination(false)}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddDestination}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add Destination
                  </button>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading destinations...</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {destinations.map((destination) => (
                  <li key={destination.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {destination.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {destination.description}
                          </p>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="mr-4">
                              Budget: ${destination.budget}
                            </span>
                            <span>
                              Activities: {destination.activities.length}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex space-x-2">
                          <button
                            onClick={() =>
                              navigate(`/admin/destinations/${destination.id}`)
                            }
                            className="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteDestination(destination.id)}
                            className="px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 