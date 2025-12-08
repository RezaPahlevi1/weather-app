import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useWeather } from "../context/WeatherContext";

import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Recenter map when city changes
function RecenterMap({ city }) {
  const map = useMap();

  useEffect(() => {
    if (!city) return;
    map.setView([city.lat, city.lon], 12, { animate: true });
  }, [city]);

  return null;
}

// Handle click events
function MapClickHandler() {
  const { setCity } = useWeather();

  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      setCity({ lat, lon }); // <-- trigger weather + forecast update
    },
  });

  return null;
}

export default function FullscreenMap() {
  const { city, setCity } = useWeather();
  const [initialCenter, setInitialCenter] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        setInitialCenter([lat, lon]);
        setCity({ lat, lon });
      },
      () => {
        setInitialCenter([-6.2, 106.8]);
        setCity({ lat: -6.2, lon: 106.8 });
      }
    );
  }, []);

  if (!initialCenter) {
    return <div className="text-white">Loading map...</div>;
  }

  return (
    <MapContainer
      center={initialCenter}
      zoom={12}
      scrollWheelZoom
      className="w-full h-screen"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Move map view when city changes */}
      {city && <RecenterMap city={city} />}

      {/* Register click handler */}
      <MapClickHandler />

      {/* Marker always reflects city */}
      {city && <Marker position={[city.lat, city.lon]} />}
    </MapContainer>
  );
}
