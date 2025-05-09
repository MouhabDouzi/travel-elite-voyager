import React, { useState } from 'react';
import { HeartIcon, MessageCircleIcon, Share2Icon, ImageIcon, XIcon } from 'lucide-react';
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

export const CommunityFeed: React.FC = () => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    destination: '',
    image: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
    toast.success('Liked post!');
  };

  const handleComment = (postId: string): void => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      toast.info('Comment feature coming soon!');
    }
  };

  const handleShare = (postId: string): void => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      toast.info('Share feature coming soon!');
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.content.trim() || !newPost.destination.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPostData: Post = {
        id: Date.now().toString(),
        user: {
          name: 'Current User',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
        },
        content: newPost.content,
        destination: newPost.destination,
        image: newPost.image || undefined,
        likes: 0,
        comments: 0,
        timestamp: new Date(),
      };

      setPosts(prev => [newPostData, ...prev]);
      setNewPost({ content: '', destination: '', image: '' });
      setIsModalOpen(false);
      toast.success('Your travel story has been shared!');
    } catch (error) {
      toast.error('Failed to share your story');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Travel Community</h2>
      
      {posts.map(post => (
        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{post.user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.destination} • {post.timestamp.toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
            
            {post.image && (
              <div className="mb-4">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center space-x-2 hover:text-travel-blue dark:hover:text-travel-light-blue"
              >
                <HeartIcon className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              
              <button
                onClick={() => handleComment(post.id)}
                className="flex items-center space-x-2 hover:text-travel-blue dark:hover:text-travel-light-blue"
              >
                <MessageCircleIcon className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              
              <button
                onClick={() => handleShare(post.id)}
                className="flex items-center space-x-2 hover:text-travel-blue dark:hover:text-travel-light-blue"
              >
                <Share2Icon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <button
        className="w-full py-3 bg-travel-blue text-white rounded-lg hover:bg-travel-teal transition-colors flex items-center justify-center space-x-2"
        onClick={() => setIsModalOpen(true)}
      >
        <ImageIcon className="w-5 h-5" />
        <span>Share Your Travel Story</span>
      </button>

      {/* Share Story Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Share Your Travel Story</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Destination *
                </label>
                <input
                  type="text"
                  id="destination"
                  value={newPost.destination}
                  onChange={(e) => setNewPost(prev => ({ ...prev, destination: e.target.value }))}
                  placeholder="Where did you go?"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Story *
                </label>
                <textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your travel experience..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image URL (optional)
                </label>
                <input
                  type="text"
                  id="image"
                  value={newPost.image}
                  onChange={(e) => setNewPost(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="Paste image URL here"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-travel-blue dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-travel-blue text-white rounded-md hover:bg-travel-teal transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sharing...' : 'Share Story'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 