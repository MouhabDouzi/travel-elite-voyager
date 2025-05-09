# TravelPlannerElite 🌍✈️

A modern travel planning application that helps users discover and plan their perfect trip. Built with React, TypeScript, and Vite.

## Features ✨

- 🗺️ Interactive map with destination markers
- 🔍 Dynamic filtering by budget, temperature, and preferences
- 🌤️ Real-time weather information for selected destinations
- 📅 Customizable trip itineraries
- 📱 Responsive design for all devices
- 🎨 Modern UI with smooth animations
- 🔔 Toast notifications for user feedback

## Tech Stack 🛠️

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- Leaflet.js for maps
- OpenWeatherMap API
- Sonner for toast notifications

## Prerequisites 📋

- Node.js 16+
- npm or yarn
- OpenWeatherMap API key

## Setup Instructions 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/travel-planner-elite.git
   cd travel-planner-elite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
   Get your API key from [OpenWeatherMap](https://openweathermap.org/api)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure 📁

```
src/
├── components/     # React components
├── lib/           # Utility functions and services
├── data/          # Mock data and types
├── pages/         # Page components
└── styles/        # Global styles
```

## Development 🛠️

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Deployment 🚀

1. Create a Vercel account if you haven't already
2. Connect your GitHub repository
3. Add environment variables in Vercel dashboard:
   - `VITE_OPENWEATHER_API_KEY`
4. Deploy!

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Leaflet](https://leafletjs.com/) for maps
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
