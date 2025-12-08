import { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "./SettingsContext";
import { getWeather, getForecast } from "../api/weather";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const { unit, lang } = useSettings();

  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
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
        const humidities = list.map((x) => x.main.humidity);
        const pressures = list.map((x) => x.main.pressure);
        const feels = list.map((x) => x.main.feels_like);
        const winds = list.map((x) => x.wind.speed);

        return {
          date,
          temp_min: Math.min(...temps),
          temp_max: Math.max(...temps),
          humidity: Math.round(
            humidities.reduce((a, b) => a + b, 0) / humidities.length
          ),
          pressure: Math.round(
            pressures.reduce((a, b) => a + b, 0) / pressures.length
          ),
          feels_like: Math.round(
            feels.reduce((a, b) => a + b, 0) / feels.length
          ),
          wind: Math.round(winds.reduce((a, b) => a + b, 0) / winds.length),
          icon: list[0].weather[0].icon,
          description: list[0].weather[0].description,
        };
      });

      setForecast(daily);
    } catch (e) {
      console.log("Forecast error", e);
    }
  }

  useEffect(() => {
    if (!city) return;

    loadWeather(city.lat, city.lon);
    loadForecast(city.lat, city.lon);
  }, [city, unit, lang]);

  const value = {
    city,
    setCity,
    weather,
    forecast,
    loading,
    error,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);
