import { useWeather } from "../context/WeatherContext";

export default function FloatingLeftInfo() {
  const { coord } = useWeather();

  if (!coord) return null;

  return (
    <div className="fixed top-4 left-4 z-999 text-white bg-black/40 p-3 rounded-xl backdrop-blur-md text-sm">
      <p>Lat: {coord.lat.toFixed(4)}</p>
      <p>Lon: {coord.lon.toFixed(4)}</p>
    </div>
  );
}
