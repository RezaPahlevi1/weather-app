import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useWeather } from "../context/WeatherContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component untuk memindahkan map ke koordinat baru
function RecenterMap({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (!lat || !lon) return;
    map.setView([lat, lon], 12, { animate: true });
  }, [lat, lon]);

  return null;
}

function MapClickHandler({ setPin }) {
  const { setCity } = useWeather();

  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      setCity({ lat, lon });
      setPin({ lat, lon });
    },
  });

  return null;
}

export default function FullscreenMap() {
  const { city, setCity } = useWeather();

  const [pin, setPin] = useState(null);
  const [initialCenter, setInitialCenter] = useState(null);

  // GET USER LOCATION FIRST
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        setInitialCenter([lat, lon]); // hanya 1x set
        setPin({ lat, lon });
        setCity({ lat, lon });
      },
      () => {
        // fallback: Jakarta
        setInitialCenter([-6.2, 106.8]);
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

      {/* Gerakkan map ketika city berubah */}
      {city && <RecenterMap lat={city.lat} lon={city.lon} />}

      <MapClickHandler setPin={setPin} />

      {pin && <Marker position={[pin.lat, pin.lon]} />}
    </MapContainer>
  );
}
