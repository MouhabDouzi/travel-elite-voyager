export interface Activity {
  name: string;
  duration: string;
  cost: number;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  budget: number;
  temperature: number;
  purposes: string[];
  weather: string[];
  imageUrl: string;
  activities: Activity[];
}

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Bali, Indonesia',
    description: 'Tropical paradise with beautiful beaches and rich culture',
    latitude: -8.4095,
    longitude: 115.1889,
    budget: 1500,
    temperature: 28,
    purposes: ['Leisure', 'Adventure', 'Romantic'],
    weather: ['Sunny', 'Rainy'],
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    activities: [
      { name: 'Visit Ubud Monkey Forest', duration: '2 hours', cost: 20 },
      { name: 'Tegallalang Rice Terraces', duration: '3 hours', cost: 15 },
      { name: 'Uluwatu Temple', duration: '2 hours', cost: 10 },
      { name: 'Beach Day at Kuta', duration: 'Full day', cost: 30 },
    ]
  },
  {
    id: '2',
    name: 'Paris, France',
    description: 'City of love, art, and exquisite cuisine',
    latitude: 48.8566,
    longitude: 2.3522,
    budget: 2500,
    temperature: 15,
    purposes: ['Romantic', 'Culture', 'Leisure'],
    weather: ['Cloudy', 'Rainy'],
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3a917209c20e',
    activities: [
      { name: 'Eiffel Tower Visit', duration: '3 hours', cost: 30 },
      { name: 'Louvre Museum', duration: '4 hours', cost: 20 },
      { name: 'Seine River Cruise', duration: '1 hour', cost: 25 },
      { name: 'Notre-Dame Cathedral', duration: '2 hours', cost: 0 },
    ]
  },
  {
    id: '3',
    name: 'Tokyo, Japan',
    description: 'Modern metropolis with rich cultural heritage',
    latitude: 35.6762,
    longitude: 139.6503,
    budget: 3000,
    temperature: 20,
    purposes: ['Culture', 'Business', 'Adventure'],
    weather: ['Sunny', 'Cloudy'],
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
    activities: [
      { name: 'Shibuya Crossing', duration: '1 hour', cost: 0 },
      { name: 'Tokyo Skytree', duration: '2 hours', cost: 25 },
      { name: 'Tsukiji Outer Market', duration: '3 hours', cost: 50 },
      { name: 'Meiji Shrine', duration: '2 hours', cost: 0 },
    ]
  },
  {
    id: '4',
    name: 'New York, USA',
    description: 'The city that never sleeps',
    latitude: 40.7128,
    longitude: -74.0060,
    budget: 2800,
    temperature: 18,
    purposes: ['Business', 'Culture', 'Leisure'],
    weather: ['Sunny', 'Cloudy', 'Snowy'],
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
    activities: [
      { name: 'Statue of Liberty', duration: '3 hours', cost: 25 },
      { name: 'Central Park', duration: '4 hours', cost: 0 },
      { name: 'Times Square', duration: '2 hours', cost: 0 },
      { name: 'Broadway Show', duration: '3 hours', cost: 150 },
    ]
  },
  {
    id: '5',
    name: 'Sydney, Australia',
    description: 'Stunning harbor city with iconic landmarks',
    latitude: -33.8688,
    longitude: 151.2093,
    budget: 2200,
    temperature: 25,
    purposes: ['Leisure', 'Adventure', 'Family'],
    weather: ['Sunny', 'Cloudy'],
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
    activities: [
      { name: 'Sydney Opera House', duration: '2 hours', cost: 40 },
      { name: 'Bondi Beach', duration: 'Full day', cost: 30 },
      { name: 'Harbor Bridge Climb', duration: '3 hours', cost: 200 },
      { name: 'Royal Botanic Garden', duration: '2 hours', cost: 0 },
    ]
  }
];
