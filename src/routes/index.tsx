import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import UserDashboard from '@/pages/user/DashboardPage';
import MyTripsPage from '@/pages/user/MyTripsPage';
import AdminDashboard from '@/pages/admin/DashboardPage';
import ManageDestinations from '@/pages/admin/DestinationsPage';
import AnalyticsPage from '@/pages/admin/AnalyticsPage';
import NotFound from '@/pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
    path: '/user/dashboard',
    element: (
      <PrivateRoute>
        <UserDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '/user/trips',
    element: (
      <PrivateRoute>
        <MyTripsPage />
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