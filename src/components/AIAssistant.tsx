import { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { travelDataService } from '../services/travelDataService';
import { TravelRecommendation, Destination } from '../types/travel';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI travel assistant. I can help you plan your next adventure, find the best destinations, and provide personalized recommendations. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Process user input and generate response
      const response = await generateAIResponse(input);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to generate response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const extractFiltersFromInput = (input: string) => {
    const filters: any = {};

    // Extract budget level
    if (input.includes('budget') || input.includes('cheap')) {
      filters.budget = 'budget';
    } else if (input.includes('luxury') || input.includes('expensive')) {
      filters.budget = 'luxury';
    } else if (input.includes('mid') || input.includes('moderate')) {
      filters.budget = 'midRange';
    }

    // Extract activities
    const activities = [];
    if (input.includes('beach')) activities.push('beach');
    if (input.includes('hiking') || input.includes('mountain')) activities.push('hiking');
    if (input.includes('culture') || input.includes('museum')) activities.push('culture');
    if (input.includes('food') || input.includes('cuisine')) activities.push('food');
    if (activities.length > 0) {
      filters.activities = activities;
    }

    // Extract weather preference
    if (input.includes('warm') || input.includes('hot')) {
      filters.weather = 'warm';
    } else if (input.includes('cold') || input.includes('snow')) {
      filters.weather = 'cold';
    }

    // Extract duration
    const durationMatch = input.match(/(\d+)\s*(?:day|week|month)/i);
    if (durationMatch) {
      filters.duration = parseInt(durationMatch[1]);
    }

    return filters;
  };

  const formatDestinationsResponse = (destinations: Destination[]): string => {
    return 'Based on your preferences, here are some great destinations to consider:\n\n' +
           destinations.map(dest => 
             `📍 ${dest.name}, ${dest.country}\n` +
             `   • Rating: ${dest.rating}/5 (${dest.reviews} reviews)\n` +
             `   • Current weather: ${dest.weather.description}, ${dest.weather.temperature}°C\n` +
             `   • Top activities: ${dest.activities.slice(0, 3).join(', ')}\n`
           ).join('\n') +
           '\nWould you like more details about any of these destinations?';
  };

  const formatDestinationDetails = (recommendation: TravelRecommendation): string => {
    return `Here's what you need to know about ${recommendation.destination}:\n\n` +
           `🌤️ Weather: ${recommendation.weather.description}, ${recommendation.weather.temperature}°C\n` +
           `📅 Best time to visit: ${recommendation.bestTime}\n\n` +
           `🎯 Top Activities:\n${recommendation.activities.slice(0, 5).map(activity => `   • ${activity}`).join('\n')}\n\n` +
           `🍽️ Local Cuisine:\n${recommendation.localCuisine.slice(0, 3).map(food => `   • ${food}`).join('\n')}\n\n` +
           `🚌 Transportation: ${recommendation.localTransportation.join(', ')}\n\n` +
           `💡 Travel Tips:\n${recommendation.tips.slice(0, 3).map(tip => `   • ${tip}`).join('\n')}\n\n` +
           `Would you like to know more about any specific aspect?`;
  };

  const formatWeatherResponse = (recommendation: TravelRecommendation): string => {
    return `Current weather in ${recommendation.destination}:\n\n` +
           `🌡️ Temperature: ${recommendation.weather.temperature}°C\n` +
           `🌤️ Condition: ${recommendation.weather.description}\n` +
           `💧 Humidity: ${recommendation.weather.humidity}%\n` +
           `💨 Wind Speed: ${recommendation.weather.windSpeed} m/s\n\n` +
           `Best time to visit: ${recommendation.bestTime}\n\n` +
           `Would you like to know more about the destination?`;
  };

  const formatBudgetResponse = (recommendation: TravelRecommendation): string => {
    return `Budget information for ${recommendation.destination}:\n\n` +
           `🏨 Accommodation options:\n${recommendation.accommodation.slice(0, 3).map(acc => `   • ${acc}`).join('\n')}\n\n` +
           `🚌 Transportation: ${recommendation.localTransportation.join(', ')}\n\n` +
           `💡 Money-saving tips:\n${recommendation.tips.filter(tip => tip.toLowerCase().includes('budget') || tip.toLowerCase().includes('cost')).slice(0, 3).map(tip => `   • ${tip}`).join('\n')}\n\n` +
           `Would you like more specific information about any aspect of the budget?`;
  };

  const generateAIResponse = async (userInput: string): Promise<string> => {
    const input = userInput.toLowerCase();

    // Handle greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Hello! How can I help you plan your next adventure?';
    }

    // Handle destination recommendations
    if (input.includes('recommend') || input.includes('suggest') || input.includes('where should i go')) {
      try {
        const filters = extractFiltersFromInput(input);
        const destinations = await travelDataService.fetchDestinations(filters);
        
        if (destinations.length === 0) {
          return 'I couldn\'t find any destinations matching your criteria. Could you try different preferences?';
        }

        const topDestinations = destinations.slice(0, 3);
        return formatDestinationsResponse(topDestinations);
      } catch (error) {
        console.error('Error fetching destinations:', error);
        return 'I\'m having trouble fetching destination recommendations. Please try again later.';
      }
    }

    // Handle specific destination queries
    const destinationMatch = input.match(/(?:tell me about|information about|details about) (.+)/i);
    if (destinationMatch) {
      const destination = destinationMatch[1].trim();
      try {
        const recommendation = await travelDataService.fetchTravelRecommendation(destination);
        return formatDestinationDetails(recommendation);
      } catch (error) {
        console.error('Error fetching destination details:', error);
        return `I'm sorry, I couldn't find detailed information about ${destination}. Could you try a different destination?`;
      }
    }

    // Handle weather queries
    if (input.includes('weather') || input.includes('climate')) {
      const locationMatch = input.match(/(?:weather|climate) (?:in|at|for) (.+)/i);
      if (locationMatch) {
        const location = locationMatch[1].trim();
        try {
          const recommendation = await travelDataService.fetchTravelRecommendation(location);
          return formatWeatherResponse(recommendation);
        } catch (error) {
          console.error('Error fetching weather:', error);
          return `I'm sorry, I couldn't find weather information for ${location}. Could you try a different location?`;
        }
      }
    }

    // Handle budget queries
    if (input.includes('budget') || input.includes('cost') || input.includes('expensive')) {
      const locationMatch = input.match(/(?:budget|cost|expensive) (?:in|at|for) (.+)/i);
      if (locationMatch) {
        const location = locationMatch[1].trim();
        try {
          const recommendation = await travelDataService.fetchTravelRecommendation(location);
          return formatBudgetResponse(recommendation);
        } catch (error) {
          console.error('Error fetching budget information:', error);
          return `I'm sorry, I couldn't find budget information for ${location}. Could you try a different location?`;
        }
      }
    }

    // Default response for unrecognized queries
    return 'I\'m not sure I understand. Could you please rephrase your question? I can help you with:\n' +
           '• Destination recommendations\n' +
           '• Weather information\n' +
           '• Budget planning\n' +
           '• Local tips and activities\n' +
           '• Travel logistics';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full p-4 shadow-lg transition-all duration-300"
        >
          <Send className="h-6 w-6" />
        </button>
      ) : (
        <div className="bg-background border rounded-lg shadow-xl w-96 h-[600px] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">AI Travel Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about destinations, weather, or travel tips..."
                className="flex-1 bg-muted rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAssistant; 