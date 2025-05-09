import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: Date;
  destination: string;
}

const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      content: 'Just returned from an amazing trip to Bali! The beaches were incredible and the local culture was so welcoming. Highly recommend visiting Ubud for the rice terraces!',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      likes: 124,
      comments: 23,
      timestamp: new Date(Date.now() - 3600000),
      destination: 'Bali, Indonesia',
    },
    {
      id: '2',
      user: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      },
      content: 'Paris in spring is magical! The cherry blossoms at the Eiffel Tower were breathtaking. Don\'t miss the local patisseries!',
      image: 'https://images.unsplash.com/photo-1502602898657-3a917209c20e',
      likes: 89,
      comments: 15,
      timestamp: new Date(Date.now() - 7200000),
      destination: 'Paris, France',
    },
  ]);

  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
    toast.success('Liked post!');
  };

  const handleComment = (postId: string) => {
    toast.info('Comment feature coming soon!');
  };

  const handleShare = (postId: string) => {
    toast.info('Share feature coming soon!');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Travel Community</h2>
      
      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{post.user.name}</h3>
                <p className="text-sm text-gray-500">
                  {post.destination} • {post.timestamp.toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{post.content}</p>
            
            {post.image && (
              <div className="mb-4">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="flex items-center space-x-6 text-gray-500">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center space-x-2 hover:text-travel-blue"
              >
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              
              <button
                onClick={() => handleComment(post.id)}
                className="flex items-center space-x-2 hover:text-travel-blue"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              
              <button
                onClick={() => handleShare(post.id)}
                className="flex items-center space-x-2 hover:text-travel-blue"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <button
        className="w-full py-3 bg-travel-blue text-white rounded-lg hover:bg-travel-teal transition-colors flex items-center justify-center space-x-2"
        onClick={() => toast.info('Post creation coming soon!')}
      >
        <ImageIcon className="w-5 h-5" />
        <span>Share Your Travel Story</span>
      </button>
    </div>
  );
};

export default CommunityFeed; 