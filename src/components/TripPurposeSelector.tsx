
import React from 'react';
import { Check } from "lucide-react";

interface TripPurposeOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface TripPurposeSelectorProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

const options: TripPurposeOption[] = [
  {
    id: 'leisure',
    name: 'Leisure',
    icon: '🏖️',
    description: 'Relaxation and enjoyment'
  },
  {
    id: 'business',
    name: 'Business',
    icon: '💼',
    description: 'Work-related travel'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    icon: '🏔️',
    description: 'Thrilling experiences'
  },
  {
    id: 'romantic',
    name: 'Romantic',
    icon: '❤️',
    description: 'Couples getaway'
  },
  {
    id: 'family',
    name: 'Family',
    icon: '👨‍👩‍👧‍👦',
    description: 'Kid-friendly activities'
  },
  {
    id: 'culture',
    name: 'Cultural',
    icon: '🏛️',
    description: 'History and local traditions'
  }
];

const TripPurposeSelector: React.FC<TripPurposeSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {options.map((option) => (
        <div
          key={option.id}
          className={`
            relative border rounded-lg p-4 cursor-pointer transition-all
            ${selected === option.id 
              ? 'border-travel-teal bg-travel-teal/5 shadow-sm' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }
          `}
          onClick={() => onSelect(option.id)}
        >
          {selected === option.id && (
            <div className="absolute top-2 right-2 h-5 w-5 flex items-center justify-center rounded-full bg-travel-teal text-white">
              <Check className="h-3 w-3" />
            </div>
          )}
          <div className="text-center">
            <div className="text-3xl mb-2">{option.icon}</div>
            <div className="font-medium text-sm">{option.name}</div>
            <div className="text-xs text-gray-500 mt-1">{option.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TripPurposeSelector;
