import { useState, useEffect } from "react";
import { searchCity } from "../api/weather";
import { useWeather } from "../context/WeatherContext";

export default function SearchCity() {
  const { setCity } = useWeather();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounce timer
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await searchCity(query);
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  function handleSelect(cityObj) {
    setCity({
      name: cityObj.name,
      lat: cityObj.lat,
      lon: cityObj.lon,
      country: cityObj.country,
      state: cityObj.state || "",
    });

    setQuery(cityObj.name);
    setShowDropdown(false);
    setResults([]);
  }

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
      <input
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setShowDropdown(true)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {loading && (
        <div style={{ marginTop: "5px", fontSize: "14px" }}>Loading...</div>
      )}

      {showDropdown && results.length > 0 && (
        <ul
          style={{
            position: "absolute",
            width: "100%",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginTop: "5px",
            listStyle: "none",
            padding: "0",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 20,
          }}
        >
          {results.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
            >
              <strong>{city.name}</strong> {city.state && `, ${city.state}`} —{" "}
              {city.country}
            </li>
          ))}
        </ul>
      )}

      {!loading && showDropdown && results.length === 0 && query && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            marginTop: "5px",
            background: "white",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "14px",
          }}
        >
          No results
        </div>
      )}
    </div>
  );
}
