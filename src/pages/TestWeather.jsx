import { useWeather } from "../context/WeatherContext";
import { useSettings } from "../context/SettingsContext";
import SearchCity from "../components/SearchCity";

export default function TestWeather() {
  const { weather, loading, error, setCity } = useWeather();
  const { unit, setUnit, lang, setLang } = useSettings();

  // Set kota manual buat testing
  function loadJakarta() {
    setCity({
      name: "Jakarta",
      lat: -6.2088,
      lon: 106.8456,
    });
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Testing Weather Context</h2>
      <SearchCity />

      <button onClick={loadJakarta}>Load Jakarta Weather</button>

      <div style={{ marginTop: 20 }}>
        <h3>Settings</h3>
        <p>Unit: {unit}</p>
        <button
          onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
        >
          Switch Unit (°C / °F)
        </button>

        <p>Language: {lang}</p>
        <button onClick={() => setLang(lang === "en" ? "id" : "en")}>
          Switch Language
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {weather && (
          <pre style={{ background: "#eee", padding: 10 }}>
            {JSON.stringify(weather, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
