import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Calendar, Clock, DollarSign, Cloud, Droplets, Wind } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
