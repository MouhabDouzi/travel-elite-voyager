import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface TravelHistory {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalSpent: number;
  categories: {
    accommodation: number;
    transportation: number;
    activities: number;
    food: number;
    shopping: number;
    other: number;
  };
  photos: string[];
  notes: string;
  rating: number;
}

interface BudgetTracking {
  totalBudget: number;
  spent: number;
  remaining: number;
  categories: {
    accommodation: number;
    transportation: number;
    activities: number;
    food: number;
    shopping: number;
    other: number;
  };
  history: {
    date: string;
    amount: number;
    category: string;
    description: string;
  }[];
}

interface TravelHistoryContextType {
  travelHistory: TravelHistory[];
  budgetTracking: BudgetTracking;
  addTrip: (trip: Omit<TravelHistory, 'id'>) => void;
  updateTrip: (id: string, trip: Partial<TravelHistory>) => void;
  deleteTrip: (id: string) => void;
  addExpense: (expense: Omit<BudgetTracking['history'][0], 'date'>) => void;
  updateBudget: (amount: number) => void;
  getTravelStats: () => {
    totalTrips: number;
    totalSpent: number;
    averageTripCost: number;
    mostVisitedDestination: string;
    favoriteCategory: string;
  };
}

const TravelHistoryContext = createContext<TravelHistoryContextType | undefined>(undefined);

export const TravelHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [travelHistory, setTravelHistory] = useState<TravelHistory[]>([]);
  const [budgetTracking, setBudgetTracking] = useState<BudgetTracking>({
    totalBudget: 0,
    spent: 0,
    remaining: 0,
    categories: {
      accommodation: 0,
      transportation: 0,
      activities: 0,
      food: 0,
      shopping: 0,
      other: 0,
    },
    history: [],
  });

  // Load user's travel history and budget data
  useEffect(() => {
    if (user) {
      // TODO: Load data from backend
      // For now, using localStorage
      const savedHistory = localStorage.getItem(`travelHistory_${user.id}`);
      const savedBudget = localStorage.getItem(`budgetTracking_${user.id}`);
      
      if (savedHistory) {
        setTravelHistory(JSON.parse(savedHistory));
      }
      if (savedBudget) {
        setBudgetTracking(JSON.parse(savedBudget));
      }
    }
  }, [user]);

  // Save changes to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`travelHistory_${user.id}`, JSON.stringify(travelHistory));
      localStorage.setItem(`budgetTracking_${user.id}`, JSON.stringify(budgetTracking));
    }
  }, [travelHistory, budgetTracking, user]);

  const addTrip = (trip: Omit<TravelHistory, 'id'>) => {
    const newTrip = {
      ...trip,
      id: Date.now().toString(),
    };
    setTravelHistory([...travelHistory, newTrip]);
  };

  const updateTrip = (id: string, trip: Partial<TravelHistory>) => {
    setTravelHistory(
      travelHistory.map((t) => (t.id === id ? { ...t, ...trip } : t))
    );
  };

  const deleteTrip = (id: string) => {
    setTravelHistory(travelHistory.filter((t) => t.id !== id));
  };

  const addExpense = (expense: Omit<BudgetTracking['history'][0], 'date'>) => {
    const newExpense = {
      ...expense,
      date: new Date().toISOString(),
    };

    setBudgetTracking((prev) => {
      const newSpent = prev.spent + expense.amount;
      const newCategories = {
        ...prev.categories,
        [expense.category]: prev.categories[expense.category as keyof typeof prev.categories] + expense.amount,
      };

      return {
        ...prev,
        spent: newSpent,
        remaining: prev.totalBudget - newSpent,
        categories: newCategories,
        history: [...prev.history, newExpense],
      };
    });
  };

  const updateBudget = (amount: number) => {
    setBudgetTracking((prev) => ({
      ...prev,
      totalBudget: amount,
      remaining: amount - prev.spent,
    }));
  };

  const getTravelStats = () => {
    const totalTrips = travelHistory.length;
    const totalSpent = travelHistory.reduce((sum, trip) => sum + trip.totalSpent, 0);
    const averageTripCost = totalTrips > 0 ? totalSpent / totalTrips : 0;

    // Find most visited destination
    const destinationCount = travelHistory.reduce((acc, trip) => {
      acc[trip.destination] = (acc[trip.destination] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostVisitedDestination = Object.entries(destinationCount)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'None';

    // Find favorite spending category
    const categoryTotals = travelHistory.reduce((acc, trip) => {
      Object.entries(trip.categories).forEach(([category, amount]) => {
        acc[category] = (acc[category] || 0) + amount;
      });
      return acc;
    }, {} as Record<string, number>);

    const favoriteCategory = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'None';

    return {
      totalTrips,
      totalSpent,
      averageTripCost,
      mostVisitedDestination,
      favoriteCategory,
    };
  };

  return (
    <TravelHistoryContext.Provider
      value={{
        travelHistory,
        budgetTracking,
        addTrip,
        updateTrip,
        deleteTrip,
        addExpense,
        updateBudget,
        getTravelStats,
      }}
    >
      {children}
    </TravelHistoryContext.Provider>
  );
};

export const useTravelHistory = () => {
  const context = useContext(TravelHistoryContext);
  if (context === undefined) {
    throw new Error('useTravelHistory must be used within a TravelHistoryProvider');
  }
  return context;
}; 