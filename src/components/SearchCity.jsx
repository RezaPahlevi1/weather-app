import { useState, useEffect, useRef } from "react";
import { searchCity } from "../api/weather";
import { useWeather } from "../context/WeatherContext";

export default function SearchCity() {
  const { setCity } = useWeather();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const boxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-999 w-[300px]">
      <div ref={boxRef} className="relative w-full max-w-[400px]">
        <input
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setShowDropdown(true)}
          className="
          w-full px-4 py-2
          rounded-lg bg-slate-800/30 backdrop-blur-md text-white
          border border-white/20 placeholder-white/50
          focus:outline-none focus:ring-2 focus:ring-white/30
        "
        />

        {loading && (
          <div className="mt-1 text-sm text-gray-200">Loading...</div>
        )}

        {showDropdown && results.length > 0 && (
          <ul
            className="
            absolute w-full mt-2 z-20
            bg-slate-800/30 backdrop-blur-xl
            border border-white/20 rounded-lg
            max-h-[220px] overflow-y-auto
            shadow-xl
          "
          >
            {results.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelect(city)}
                className="
                px-4 py-3 cursor-pointer
                hover:bg-slate-800/30 transition
                text-white text-sm
              "
              >
                <span className="font-semibold">{city.name}</span>
                {city.state && `, ${city.state}`} — {city.country}
              </li>
            ))}
          </ul>
        )}

        {!loading && showDropdown && results.length === 0 && query && (
          <div
            className="
            absolute w-full mt-2 p-3
            bg-slate-800/30 backdrop-blur-xl text-white/80
            border border-white/20 rounded-lg text-sm
          "
          >
            No results
          </div>
        )}
      </div>
    </div>
  );
}
