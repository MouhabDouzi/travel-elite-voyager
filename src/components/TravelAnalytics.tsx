import React from 'react';
import { useTravelHistory } from '@/contexts/TravelHistoryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

const TravelAnalytics: React.FC = () => {
  const { travelHistory, budgetTracking, getTravelStats } = useTravelHistory();
  const stats = getTravelStats();

  // Prepare data for charts
  const categoryData = Object.entries(budgetTracking.categories).map(([category, amount]) => ({
    category,
    amount,
  }));

  const monthlySpending = travelHistory.reduce((acc, trip) => {
    const month = new Date(trip.startDate).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + trip.totalSpent;
    return acc;
  }, {} as Record<string, number>);

  const monthlyData = Object.entries(monthlySpending).map(([month, amount]) => ({
    month,
    amount,
  }));

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTrips}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalSpent)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Average Trip Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.averageTripCost)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Most Visited</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.mostVisitedDestination}</div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Spent: {formatCurrency(budgetTracking.spent)}</span>
              <span>Remaining: {formatCurrency(budgetTracking.remaining)}</span>
            </div>
            <Progress 
              value={(budgetTracking.spent / budgetTracking.totalBudget) * 100} 
              className="h-2"
            />
            <div className="text-sm text-muted-foreground">
              Total Budget: {formatCurrency(budgetTracking.totalBudget)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spending by Category */}
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="amount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Spending */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Bar dataKey="amount" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Trips */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {travelHistory.slice(0, 5).map((trip) => (
              <div key={trip.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{trip.destination}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(trip.totalSpent)}</div>
                  <div className="text-sm text-muted-foreground">
                    Rating: {trip.rating}/5
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelAnalytics;