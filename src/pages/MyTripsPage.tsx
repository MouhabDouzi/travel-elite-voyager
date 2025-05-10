import React from 'react';
import TravelHistoryManager from '@/components/TravelHistoryManager';

const MyTripsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Travel History</h1>
        <TravelHistoryManager />
      </div>
    </div>
  );
};

export default MyTripsPage; 