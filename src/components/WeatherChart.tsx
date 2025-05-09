
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface MonthData {
  name: string;
  high: number;
  low: number;
  rain: number;
}

const data: MonthData[] = [
  { name: 'Jan', high: 22, low: 15, rain: 50 },
  { name: 'Feb', high: 22, low: 16, rain: 60 },
  { name: 'Mar', high: 23, low: 16, rain: 70 },
  { name: 'Apr', high: 25, low: 17, rain: 80 },
  { name: 'May', high: 27, low: 19, rain: 40 },
  { name: 'Jun', high: 29, low: 21, rain: 20 },
  { name: 'Jul', high: 31, low: 23, rain: 10 },
  { name: 'Aug', high: 31, low: 23, rain: 5 },
  { name: 'Sep', high: 30, low: 22, rain: 15 },
  { name: 'Oct', high: 28, low: 20, rain: 30 },
  { name: 'Nov', high: 25, low: 18, rain: 40 },
  { name: 'Dec', high: 23, low: 16, rain: 60 }
];

const WeatherChart: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-semibold">Year-round Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#2A9D8F" />
            <YAxis yAxisId="right" orientation="right" stroke="#0A4B6E" />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="high" name="High °C" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="left" dataKey="low" name="Low °C" fill="#66C3FF" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="rain" name="Rain (mm)" fill="#0A4B6E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeatherChart;
