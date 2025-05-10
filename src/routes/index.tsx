import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import DashboardPage from '@/pages/user/DashboardPage';
import MyTripsPage from '@/pages/user/MyTripsPage';
import DiscoverPage from '@/pages/DiscoverPage';
import MapViewPage from '@/pages/user/MapViewPage';
import AIAssistantPage from '@/pages/AIAssistantPage';
import PhotosPage from '@/pages/PhotosPage';
import ProfilePage from '@/pages/user/ProfilePage';
import SettingsPage from '@/pages/user/SettingsPage';
import AdminDashboard from '@/pages/admin/DashboardPage';
import ManageDestinations from '@/pages/admin/DestinationsPage';
import AnalyticsPage from '@/pages/admin/AnalyticsPage';
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/discover',
    element: (
      <PrivateRoute>
        <DiscoverPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/my-trips',
    element: (
      <PrivateRoute>
        <MyTripsPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/map',
    element: (
      <PrivateRoute>
        <MapViewPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/ai-assistant',
    element: (
      <PrivateRoute>
        <AIAssistantPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/photos',
    element: (
      <PrivateRoute>
        <PhotosPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <PrivateRoute>
        <SettingsPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute requireAdmin>
        <AdminDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/destinations',
    element: (
      <PrivateRoute requireAdmin>
        <ManageDestinations />
      </PrivateRoute>
    ),
  },
  {
    path: '/admin/analytics',
    element: (
      <PrivateRoute requireAdmin>
        <AnalyticsPage />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]); 