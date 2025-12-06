import { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "./SettingsContext";
import { getWeather } from "../api/weather";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const { unit, lang } = useSettings();

  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadWeather(lat, lon) {
    try {
      setLoading(true);
      setError("");

      const data = await getWeather(lat, lon, unit, lang);
      setWeather(data);
    } catch (e) {
      setError(e.message || "Error fetching weater");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!city) return;
    loadWeather(city.lat, city.lon);
  }, [city, unit, lang]);

  useEffect(() => {
    if (!city) return;
    const interval = setInterval(() => loadWeather(city.lat, city.lon), 45000);

    return () => clearInterval(interval);
  }, [city, unit, lang]);

  const value = {
    city,
    setCity,
    weather,
    loading,
    error,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);
