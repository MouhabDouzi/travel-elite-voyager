import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '@/types/auth';
import { authService } from '@/services/authService';
import { toast } from 'sonner';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (state.token) {
          const user = await authService.getCurrentUser();
          setState(prev => ({ ...prev, user, isLoading: false }));
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'Authentication failed',
          isLoading: false,
        }));
      }
    };

    initializeAuth();
  }, [state.token]);

  const login = async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user, token } = await authService.login(credentials);
      setState(prev => ({ ...prev, user, token, isLoading: false }));
      toast.success('Successfully logged in!');
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      }));
      toast.error('Login failed');
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { user, token } = await authService.register(data);
      setState(prev => ({ ...prev, user, token, isLoading: false }));
      toast.success('Account created successfully!');
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false,
      }));
      toast.error('Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setState({ user: null, token: null, isLoading: false, error: null });
      toast.success('Successfully logged out!');
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Logout failed',
      }));
      toast.error('Logout failed');
      throw error;
    }
  };

  const updatePreferences = async (preferences: Partial<User['preferences']>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedUser = await authService.updatePreferences(preferences);
      setState(prev => ({ ...prev, user: updatedUser, isLoading: false }));
      toast.success('Preferences updated successfully!');
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to update preferences',
        isLoading: false,
      }));
      toast.error('Failed to update preferences');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updatePreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 