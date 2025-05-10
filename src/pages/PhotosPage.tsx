import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UserNav from '@/components/user/UserNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash2 } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  destination: string;
  date: string;
  description: string;
}

export default function PhotosPage() {
  const { user } = useAuth();
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Mock photos for demonstration
  React.useEffect(() => {
    setPhotos([
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        destination: 'Bali, Indonesia',
        date: '2024-03-15',
        description: 'Beautiful beach sunset'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963',
        destination: 'Paris, France',
        date: '2024-02-20',
        description: 'Eiffel Tower at night'
      }
    ]);
  }, []);

  const handleUpload = () => {
    // Implement photo upload functionality
    console.log('Upload photo');
  };

  const handleDelete = (photoId: string) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };

  return (
    <div className="min-h-screen bg-background">
      <UserNav />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Travel Photos</h1>
          <Button onClick={handleUpload}>
            <ImagePlus className="mr-2 h-4 w-4" />
            Upload Photo
          </Button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={photo.url}
                  alt={photo.description}
                  className="object-cover w-full h-full"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleDelete(photo.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{photo.destination}</h3>
                <p className="text-sm text-muted-foreground">{photo.date}</p>
                <p className="mt-2 text-sm">{photo.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 