import React, { useState } from 'react';
import { useTravelHistory } from '@/contexts/TravelHistoryContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/lib/utils';
import { Plus, Star } from 'lucide-react';
import { toast } from 'sonner';

const TravelHistoryManager: React.FC = () => {
  const { travelHistory, addTrip, updateTrip, deleteTrip } = useTravelHistory();
  const [newTrip, setNewTrip] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    totalSpent: '',
    categories: {
      accommodation: '',
      transportation: '',
      activities: '',
      food: '',
      shopping: '',
      other: ''
    },
    notes: '',
    rating: 5,
    photos: [] as string[]
  });

  const handleAddTrip = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTrip.destination || !newTrip.startDate || !newTrip.endDate || !newTrip.totalSpent) {
      toast.error('Please fill in all required fields');
      return;
    }

    const totalSpent = parseFloat(newTrip.totalSpent);
    if (isNaN(totalSpent) || totalSpent < 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const categories = {
      accommodation: parseFloat(newTrip.categories.accommodation) || 0,
      transportation: parseFloat(newTrip.categories.transportation) || 0,
      activities: parseFloat(newTrip.categories.activities) || 0,
      food: parseFloat(newTrip.categories.food) || 0,
      shopping: parseFloat(newTrip.categories.shopping) || 0,
      other: parseFloat(newTrip.categories.other) || 0
    };

    addTrip({
      destination: newTrip.destination,
      startDate: newTrip.startDate,
      endDate: newTrip.endDate,
      totalSpent,
      categories,
      notes: newTrip.notes,
      rating: newTrip.rating,
      photos: newTrip.photos
    });

    setNewTrip({
      destination: '',
      startDate: '',
      endDate: '',
      totalSpent: '',
      categories: {
        accommodation: '',
        transportation: '',
        activities: '',
        food: '',
        shopping: '',
        other: ''
      },
      notes: '',
      rating: 5,
      photos: []
    });

    toast.success('Trip added successfully');
  };

  const handleRatingChange = (tripId: string, newRating: number) => {
    updateTrip(tripId, { rating: newRating });
    toast.success('Rating updated');
  };

  return (
    <div className="space-y-6">
      {/* Add New Trip Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Trip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTrip} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={newTrip.destination}
                  onChange={(e) => setNewTrip(prev => ({ ...prev, destination: e.target.value }))}
                  placeholder="Enter destination"
                  required
                />
              </div>
              <div>
                <Label htmlFor="totalSpent">Total Spent</Label>
                <Input
                  id="totalSpent"
                  type="number"
                  value={newTrip.totalSpent}
                  onChange={(e) => setNewTrip(prev => ({ ...prev, totalSpent: e.target.value }))}
                  placeholder="Enter total amount"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newTrip.startDate}
                  onChange={(e) => setNewTrip(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newTrip.endDate}
                  onChange={(e) => setNewTrip(prev => ({ ...prev, endDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="accommodation">Accommodation</Label>
                <Input
                  id="accommodation"
                  type="number"
                  value={newTrip.categories.accommodation}
                  onChange={(e) => setNewTrip(prev => ({
                    ...prev,
                    categories: { ...prev.categories, accommodation: e.target.value }
                  }))}
                  placeholder="Amount"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="transportation">Transportation</Label>
                <Input
                  id="transportation"
                  type="number"
                  value={newTrip.categories.transportation}
                  onChange={(e) => setNewTrip(prev => ({
                    ...prev,
                    categories: { ...prev.categories, transportation: e.target.value }
                  }))}
                  placeholder="Amount"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="activities">Activities</Label>
                <Input
                  id="activities"
                  type="number"
                  value={newTrip.categories.activities}
                  onChange={(e) => setNewTrip(prev => ({
                    ...prev,
                    categories: { ...prev.categories, activities: e.target.value }
                  }))}
                  placeholder="Amount"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newTrip.notes}
                onChange={(e) => setNewTrip(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add trip notes..."
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Trip
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Trip History */}
      <Card>
        <CardHeader>
          <CardTitle>Trip History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {travelHistory.map((trip) => (
              <div key={trip.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{trip.destination}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 cursor-pointer ${
                          star <= trip.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                        onClick={() => handleRatingChange(trip.id, star)}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {Object.entries(trip.categories).map(([category, amount]) => (
                    <div key={category} className="text-sm">
                      <span className="text-muted-foreground">{category}: </span>
                      <span className="font-medium">{formatCurrency(amount)}</span>
                    </div>
                  ))}
                </div>

                {trip.notes && (
                  <p className="text-sm text-muted-foreground mb-4">{trip.notes}</p>
                )}

                {trip.photos.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {trip.photos.map((photo, index) => (
                      <div key={index} className="relative h-20 w-20 flex-shrink-0">
                        <img
                          src={photo}
                          alt={`Trip photo ${index + 1}`}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <div className="text-lg font-semibold">
                    Total: {formatCurrency(trip.totalSpent)}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      deleteTrip(trip.id);
                      toast.success('Trip deleted');
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelHistoryManager; 