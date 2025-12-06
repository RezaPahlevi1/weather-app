// WeatherContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "./SettingsContext";
import { getWeather, getForecast } from "../api/weather";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const { unit, lang } = useSettings();

  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]); // <-- tambahan
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadWeather(lat, lon) {
    try {
      setLoading(true);
      setError("");

      const data = await getWeather(lat, lon, unit, lang);
      setWeather(data);
    } catch (e) {
      setError(e.message || "Error fetching weather");
    } finally {
      setLoading(false);
    }
  }

  async function loadForecast(lat, lon) {
    try {
      const data = await getForecast(lat, lon, unit, lang);

      // group by date
      const group = {};
      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!group[date]) group[date] = [];
        group[date].push(item);
      });

      const daily = Object.keys(group).map((date) => {
        const list = group[date];
        const temps = list.map((x) => x.main.temp);

        return {
          date,
          temp_min: Math.min(...temps),
          temp_max: Math.max(...temps),
          icon: list[0].weather[0].icon,
        };
      });

      setForecast(daily);
    } catch (e) {
      console.log("Forecast error", e);
    }
  }

  // Load data when city changes
  useEffect(() => {
    if (!city) return;

    loadWeather(city.lat, city.lon);
    loadForecast(city.lat, city.lon); // <--- tambahan aman
  }, [city, unit, lang]);

  const value = {
    city,
    setCity,
    weather,
    forecast, // <--- expose forecast ke komponen
    loading,
    error,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);
