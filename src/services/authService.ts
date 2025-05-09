import { User, LoginCredentials, RegisterData } from '@/types/auth';

const API_URL = 'http://localhost:3000/api';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // For demo purposes, simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: credentials.email,
          role: credentials.email.includes('admin') ? 'admin' : 'user',
          preferences: {
            theme: 'light',
            units: 'metric',
            language: 'en',
            notifications: true,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const mockToken = 'mock-jwt-token';
        localStorage.setItem('token', mockToken);
        resolve({ user: mockUser, token: mockToken });
      }, 1000);
    });
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    // For demo purposes, simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          name: data.name,
          email: data.email,
          role: 'user',
          preferences: {
            theme: 'light',
            units: 'metric',
            language: 'en',
            notifications: true,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const mockToken = 'mock-jwt-token';
        localStorage.setItem('token', mockToken);
        resolve({ user: mockUser, token: mockToken });
      }, 1000);
    });
  },

  async logout(): Promise<void> {
    // For demo purposes, simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('token');
        resolve();
      }, 500);
    });
  },

  async getCurrentUser(): Promise<User> {
    // For demo purposes, simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          preferences: {
            theme: 'light',
            units: 'metric',
            language: 'en',
            notifications: true,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        resolve(mockUser);
      }, 500);
    });
  },

  async updatePreferences(preferences: Partial<User['preferences']>): Promise<User> {
    // For demo purposes, simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          preferences: {
            theme: 'light',
            units: 'metric',
            language: 'en',
            notifications: true,
            ...preferences,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        resolve(mockUser);
      }, 500);
    });
  },
}; 