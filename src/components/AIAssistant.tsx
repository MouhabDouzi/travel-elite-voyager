import React, { useState } from 'react';
import { MessageCircle, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface TravelRecommendation {
  destination: string;
  activities: string[];
  bestTime: string;
  tips: string[];
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI travel assistant. I can help you plan your next adventure, find the best destinations, and provide travel tips. What would you like to know?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock travel recommendations database
  const travelRecommendations: Record<string, TravelRecommendation> = {
    'bali': {
      destination: 'Bali, Indonesia',
      activities: [
        'Visit Ubud Monkey Forest',
        'Explore rice terraces in Tegalalang',
        'Relax at Nusa Penida beaches',
        'Experience traditional dance performances',
        'Try local cuisine at warungs'
      ],
      bestTime: 'April to October (dry season)',
      tips: [
        'Rent a scooter for easy transportation',
        'Respect local customs and dress modestly',
        'Learn basic Indonesian phrases',
        'Book accommodations in advance during peak season'
      ]
    },
    'paris': {
      destination: 'Paris, France',
      activities: [
        'Visit the Eiffel Tower',
        'Explore the Louvre Museum',
        'Walk along the Seine River',
        'Visit Notre-Dame Cathedral',
        'Enjoy French cuisine at local bistros'
      ],
      bestTime: 'April to June and September to October',
      tips: [
        'Get a Paris Museum Pass for multiple attractions',
        'Use the metro for efficient transportation',
        'Book popular restaurants in advance',
        'Visit attractions early morning to avoid crowds'
      ]
    },
    'tokyo': {
      destination: 'Tokyo, Japan',
      activities: [
        'Visit Senso-ji Temple',
        'Explore Shibuya Crossing',
        'Shop at Tsukiji Outer Market',
        'Experience teamLab Borderless',
        'Try authentic ramen and sushi'
      ],
      bestTime: 'March to May and September to November',
      tips: [
        'Get a Suica card for public transportation',
        'Learn basic Japanese phrases',
        'Carry cash as some places don\'t accept cards',
        'Respect local customs and etiquette'
      ]
    }
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for greetings
    if (input.match(/^(hi|hello|hey|greetings)/i)) {
      return "Hello! How can I help you plan your next adventure? I can provide destination recommendations, travel tips, or help with specific travel questions.";
    }

    // Check for destination recommendations
    if (input.match(/recommend|suggest|where should|where to|best place/i)) {
      return "I can recommend several amazing destinations based on your preferences. Would you like to know about:\n\n" +
        "1. Bali - Perfect for culture, beaches, and nature\n" +
        "2. Paris - Ideal for art, history, and romance\n" +
        "3. Tokyo - Great for technology, food, and unique experiences\n\n" +
        "Which one interests you the most?";
    }

    // Check for specific destination queries
    for (const [key, data] of Object.entries(travelRecommendations)) {
      if (input.includes(key)) {
        return `Here's what you need to know about ${data.destination}:\n\n` +
          `Best time to visit: ${data.bestTime}\n\n` +
          `Top activities:\n${data.activities.map(a => `- ${a}`).join('\n')}\n\n` +
          `Travel tips:\n${data.tips.map(t => `- ${t}`).join('\n')}`;
      }
    }

    // Check for budget-related queries
    if (input.match(/budget|cost|expensive|cheap|affordable/i)) {
      return "I can help you plan a trip that fits your budget. Could you tell me:\n\n" +
        "1. Your approximate budget\n" +
        "2. Preferred destination\n" +
        "3. Travel duration\n\n" +
        "This will help me provide more specific recommendations!";
    }

    // Check for weather-related queries
    if (input.match(/weather|climate|temperature|season/i)) {
      return "Weather can significantly impact your travel experience. Could you specify which destination and time of year you're interested in? I can provide detailed climate information and packing suggestions.";
    }

    // Check for transportation queries
    if (input.match(/transport|transportation|how to get|getting around/i)) {
      return "Transportation options vary by destination. I can help you with:\n\n" +
        "1. Best ways to reach your destination\n" +
        "2. Local transportation options\n" +
        "3. Transportation passes and cards\n" +
        "4. Estimated costs\n\n" +
        "Which destination are you planning to visit?";
    }

    // Default response for other queries
    return "I understand you're interested in travel. To provide the most relevant information, could you please:\n\n" +
      "1. Specify your destination of interest\n" +
      "2. Mention your travel preferences (budget, activities, etc.)\n" +
      "3. Ask about specific aspects you'd like to know more about\n\n" +
      "This will help me give you more targeted recommendations!";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(input),
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      toast.error('Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-travel-blue text-white p-4 rounded-full shadow-lg hover:bg-travel-teal transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">AI Travel Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-travel-blue text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {message.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.content.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <Loader2 className="w-5 h-5 animate-spin text-travel-blue" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about destinations, activities, or travel tips..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-travel-blue dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-travel-blue text-white px-4 py-2 rounded-lg hover:bg-travel-teal transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant; 