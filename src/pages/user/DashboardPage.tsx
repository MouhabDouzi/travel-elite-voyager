import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import UserNav from '@/components/user/UserNav';
import CommunityFeed from '@/components/CommunityFeed';
import ExpenseTracker from '@/components/ExpenseTracker';
import TravelAnalytics from '@/components/TravelAnalytics';
import TravelHistoryManager from '@/components/TravelHistoryManager';

interface UserPreferences {
  theme: 'light' | 'dark';
  units: 'metric' | 'imperial';
  language: 'en' | 'es' | 'fr';
  notifications: boolean;
}

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    units: 'metric',
    language: 'en',
    notifications: true,
  });

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      // In a real app, this would be an API call
      const mockPreferences: UserPreferences = {
        theme: 'light',
        units: 'metric',
        language: 'en',
        notifications: true,
      };

      setPreferences(mockPreferences);
    } catch (error) {
      toast.error('Failed to fetch preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceChange = async (
    key: keyof UserPreferences,
    value: UserPreferences[keyof UserPreferences]
  ) => {
    try {
      // In a real app, this would be an API call
      setPreferences((prev) => ({ ...prev, [key]: value }));
      toast.success('Preferences updated successfully');
    } catch (error) {
      toast.error('Failed to update preferences');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <UserNav />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back, {user.name}!
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your preferences and view your upcoming trips.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading preferences...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Preferences Section */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Preferences
                  </h3>
                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="theme"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Theme
                      </label>
                      <select
                        id="theme"
                        name="theme"
                        value={preferences.theme}
                        onChange={(e) =>
                          handlePreferenceChange(
                            'theme',
                            e.target.value as 'light' | 'dark'
                          )
                        }
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="units"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Units
                      </label>
                      <select
                        id="units"
                        name="units"
                        value={preferences.units}
                        onChange={(e) =>
                          handlePreferenceChange(
                            'units',
                            e.target.value as 'metric' | 'imperial'
                          )
                        }
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="metric">Metric</option>
                        <option value="imperial">Imperial</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="language"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={preferences.language}
                        onChange={(e) =>
                          handlePreferenceChange(
                            'language',
                            e.target.value as 'en' | 'es' | 'fr'
                          )
                        }
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Notifications
                      </label>
                      <div className="mt-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={preferences.notifications}
                            onChange={(e) =>
                              handlePreferenceChange('notifications', e.target.checked)
                            }
                            className="form-checkbox h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Enable notifications
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Quick Links
                  </h3>
                  <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <button
                      onClick={() => navigate('/my-trips')}
                      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
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
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        View My Trips
                      </span>
                    </button>

                    <button
                      onClick={() => navigate('/')}
                      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Plan New Trip
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Community Feed */}
              <div className="bg-white shadow rounded-lg">
                <CommunityFeed />
              </div>

              {/* Expense Tracker */}
              <div className="bg-white shadow rounded-lg">
                <ExpenseTracker />
              </div>

              {/* Travel Analytics */}
              <div className="bg-white shadow rounded-lg">
                <TravelAnalytics />
              </div>

              {/* Travel History Manager */}
              <div className="bg-white shadow rounded-lg">
                <TravelHistoryManager />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 