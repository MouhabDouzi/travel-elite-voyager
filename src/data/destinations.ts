
export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  priceLevel: number; // 1-5, 1 being cheapest
  weather: {
    temp: {
      min: number;
      max: number;
    };
    condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  };
  activities: string[];
  budget: {
    flight: number; // Average flight cost in USD
    accommodation: number; // Per night in USD
    dailyExpenses: number; // Food, transport, activities per day in USD
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  bestFor: ('leisure' | 'business' | 'adventure' | 'romantic' | 'family' | 'culture')[];
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with beautiful beaches, lush rice terraces, and vibrant culture.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80',
    priceLevel: 2,
    weather: {
      temp: {
        min: 23,
        max: 32,
      },
      condition: 'sunny',
    },
    activities: ['Beach relaxation', 'Surfing', 'Temple visits', 'Rice terrace hiking', 'Spa treatments'],
    budget: {
      flight: 800,
      accommodation: 50,
      dailyExpenses: 30,
    },
    coordinates: {
      lat: -8.4095,
      lng: 115.1889,
    },
    bestFor: ['leisure', 'adventure', 'romantic', 'culture'],
  },
  {
    id: '2',
    name: 'Paris',
    country: 'France',
    description: 'City of lights famous for its art, cuisine, culture and iconic landmarks.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
    priceLevel: 4,
    weather: {
      temp: {
        min: 7,
        max: 25,
      },
      condition: 'cloudy',
    },
    activities: ['Eiffel Tower', 'Louvre Museum', 'Notre Dame Cathedral', 'Seine River Cruise', 'Montmartre'],
    budget: {
      flight: 600,
      accommodation: 150,
      dailyExpenses: 100,
    },
    coordinates: {
      lat: 48.8566,
      lng: 2.3522,
    },
    bestFor: ['leisure', 'romantic', 'culture'],
  },
  {
    id: '3',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Ultramodern metropolis with a perfect blend of traditional culture and cutting-edge technology.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    priceLevel: 4,
    weather: {
      temp: {
        min: 5,
        max: 31,
      },
      condition: 'cloudy',
    },
    activities: ['Shibuya Crossing', 'Tokyo Skytree', 'Sensoji Temple', 'Tsukiji Fish Market', 'Akihabara'],
    budget: {
      flight: 1000,
      accommodation: 120,
      dailyExpenses: 80,
    },
    coordinates: {
      lat: 35.6762,
      lng: 139.6503,
    },
    bestFor: ['leisure', 'business', 'culture'],
  },
  {
    id: '4',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Vibrant city known for stunning architecture, beautiful beaches, and delicious cuisine.',
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    priceLevel: 3,
    weather: {
      temp: {
        min: 10,
        max: 29,
      },
      condition: 'sunny',
    },
    activities: ['Sagrada Familia', 'Park Güell', 'Casa Batllo', 'La Rambla', 'Barceloneta Beach'],
    budget: {
      flight: 500,
      accommodation: 90,
      dailyExpenses: 70,
    },
    coordinates: {
      lat: 41.3851,
      lng: 2.1734,
    },
    bestFor: ['leisure', 'romantic', 'culture'],
  },
  {
    id: '5',
    name: 'New York',
    country: 'USA',
    description: 'The city that never sleeps, offering incredible dining, shopping, arts, and entertainment.',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    priceLevel: 5,
    weather: {
      temp: {
        min: -2,
        max: 30,
      },
      condition: 'snowy',
    },
    activities: ['Central Park', 'Times Square', 'Statue of Liberty', 'Empire State Building', 'Brooklyn Bridge'],
    budget: {
      flight: 500,
      accommodation: 200,
      dailyExpenses: 120,
    },
    coordinates: {
      lat: 40.7128,
      lng: -74.0060,
    },
    bestFor: ['leisure', 'business', 'culture'],
  },
  {
    id: '6',
    name: 'Cape Town',
    country: 'South Africa',
    description: 'Stunning coastal city with Table Mountain, vineyards, and diverse cultural experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    priceLevel: 3,
    weather: {
      temp: {
        min: 8,
        max: 27,
      },
      condition: 'sunny',
    },
    activities: ['Table Mountain', 'Robben Island', 'Cape of Good Hope', 'Boulders Beach', 'Victoria & Alfred Waterfront'],
    budget: {
      flight: 900,
      accommodation: 70,
      dailyExpenses: 40,
    },
    coordinates: {
      lat: -33.9249,
      lng: 18.4241,
    },
    bestFor: ['adventure', 'leisure', 'culture'],
  },
  {
    id: '7',
    name: 'Kyoto',
    country: 'Japan',
    description: 'Ancient city filled with traditional temples, gardens, and geisha districts.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    priceLevel: 3,
    weather: {
      temp: {
        min: 3,
        max: 33,
      },
      condition: 'cloudy',
    },
    activities: ['Fushimi Inari Shrine', 'Kinkaku-ji Temple', 'Arashiyama Bamboo Grove', 'Gion District', 'Philosopher\'s Path'],
    budget: {
      flight: 1000,
      accommodation: 100,
      dailyExpenses: 70,
    },
    coordinates: {
      lat: 35.0116,
      lng: 135.7681,
    },
    bestFor: ['leisure', 'culture', 'romantic'],
  },
  {
    id: '8',
    name: 'Santorini',
    country: 'Greece',
    description: 'Stunning volcanic island with white-washed buildings and spectacular sunsets.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    priceLevel: 4,
    weather: {
      temp: {
        min: 10,
        max: 30,
      },
      condition: 'sunny',
    },
    activities: ['Oia Sunset', 'Fira Town', 'Black Sand Beach', 'Wine Tasting', 'Caldera Views'],
    budget: {
      flight: 700,
      accommodation: 150,
      dailyExpenses: 80,
    },
    coordinates: {
      lat: 36.3932,
      lng: 25.4615,
    },
    bestFor: ['romantic', 'leisure'],
  }
];
