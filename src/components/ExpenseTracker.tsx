import React, { useState } from 'react';
import { useTravelHistory } from '../contexts/TravelHistoryContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { formatCurrency } from '../lib/utils';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';

const EXPENSE_CATEGORIES = [
  'accommodation',
  'transportation',
  'activities',
  'food',
  'shopping',
  'other'
] as const;

const ExpenseTracker: React.FC = () => {
  const { budgetTracking, addExpense, updateBudget } = useTravelHistory();
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    description: ''
  });
  const [newBudget, setNewBudget] = useState('');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newExpense.amount || !newExpense.category || !newExpense.description) {
      toast.error('Please fill in all fields');
      return;
    }

    const amount = parseFloat(newExpense.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    addExpense({
      amount,
      category: newExpense.category,
      description: newExpense.description
    });

    setNewExpense({
      amount: '',
      category: '',
      description: ''
    });

    toast.success('Expense added successfully');
  };

  const handleUpdateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount < 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }

    updateBudget(amount);
    setNewBudget('');
    toast.success('Budget updated successfully');
  };

  return (
    <div className="space-y-6">
      {/* Budget Update Form */}
      <Card>
        <CardHeader>
          <CardTitle>Update Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateBudget} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="budget">New Budget Amount</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  placeholder="Enter new budget"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="flex items-end">
                <Button type="submit">Update Budget</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Add Expense Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddExpense} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPENSE_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter description"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetTracking.history.slice().reverse().map((expense, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{expense.description}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString()} - {expense.category}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(expense.amount)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTracker; 