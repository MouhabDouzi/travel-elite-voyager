import { RouterProvider } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { TravelHistoryProvider } from '@/contexts/TravelHistoryContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from '@/routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TravelHistoryProvider>
            <RouterProvider router={router} />
            <Toaster />
          </TravelHistoryProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
