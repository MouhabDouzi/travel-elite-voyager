import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Destination } from '@/data/destinations';
import { WeatherInfo } from '@/types/travel';

interface AIAssistantProps {
  destination: Destination;
  weather: WeatherInfo;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ destination, weather }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      // Mock AI response for development
      const response = `Based on the current weather (${weather.condition}, ${weather.temperature}°C) in ${destination.name}, I recommend:
1. ${weather.temperature > 25 ? 'Stay hydrated and wear sunscreen' : 'Bring a light jacket'}
2. Best time to visit: ${destination.purposes.join(', ')}
3. Popular activities: ${destination.activities.map(a => a.name).join(', ')}`;
      
      setAnswer(response);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAnswer('Sorry, I encountered an error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">AI Travel Assistant</h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about your destination..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
          />
          <Button onClick={handleAsk} disabled={loading}>
            {loading ? 'Thinking...' : 'Ask'}
          </Button>
        </div>

        {answer && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="whitespace-pre-line">{answer}</p>
          </div>
        )}
      </div>
    </Card>
  );
}; 