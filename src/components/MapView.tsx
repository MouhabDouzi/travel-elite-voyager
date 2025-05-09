import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Destination } from '@/data/destinations';

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  destinations: Destination[];
  onDestinationSelect: (destination: Destination) => void;
  selectedDestination: Destination | null;
}

export const MapView: React.FC<MapViewProps> = ({
  destinations,
  onDestinationSelect,
  selectedDestination,
}) => {
  const mapRef = useRef<L.Map>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers
    destinations.forEach((destination) => {
      const marker = L.marker([destination.latitude, destination.longitude])
        .addTo(mapRef.current!)
        .bindPopup(
          `<div class="p-2">
            <h3 class="font-bold text-travel-blue">${destination.name}</h3>
            <p class="text-sm text-gray-600">${destination.description}</p>
          </div>`
        );

      marker.on('click', () => {
        onDestinationSelect(destination);
      });

      markersRef.current.push(marker);

      // Highlight selected destination
      if (selectedDestination?.id === destination.id) {
        marker.setIcon(
          L.divIcon({
            className: 'selected-marker',
            html: `<div class="w-6 h-6 bg-travel-teal rounded-full border-2 border-white shadow-lg"></div>`,
          })
        );
      }
    });
  }, [destinations, selectedDestination, onDestinationSelect]);

  return (
    <div className="map-container">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};
