import { useWeather } from "../context/WeatherContext";
import { useSettings } from "../context/SettingsContext";

export default function WeatherCard() {
  const { weather, loading, error } = useWeather();
  const { unit, lang } = useSettings();

  // loading state
  if (loading) {
    return (
      <div className="w-full p-6 bg-slate-800/40 rounded-xl text-center text-white animate-pulse">
        {lang === "id" ? "Memuat cuaca..." : "Loading weather..."}
      </div>
    );
  }

  // error state
  if (error) {
    return (
      <div className="w-full p-6 bg-red-500/20 rounded-xl text-red-300 text-center">
        {lang === "id" ? "Gagal memuat data." : "Failed to fetch weather."}
      </div>
    );
  }

  // belum ada kota dicari
  if (!weather) {
    return (
      <div className="w-full p-6 bg-slate-800/40 rounded-xl text-center text-white">
        {lang === "id"
          ? "Cari kota untuk melihat cuaca."
          : "Search for a city to display weather."}
      </div>
    );
  }

  const temp = Math.round(weather.main.temp);
  const feels = Math.round(weather.main.feels_like);
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;
  const description = weather.weather[0].description;
  const icon = weather.weather[0].icon;

  return (
    <div className="w-full p-6 bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl text-white">
      {/* Kota + negara */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {weather.name}, {weather.sys.country}
          </h1>
          <p className="text-slate-300 capitalize">{description}</p>
        </div>

        {/* icon */}
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
          className="w-20 h-20"
        />
      </div>

      {/* Temperature */}
      <div className="mt-4 flex items-center gap-4">
        <h2 className="text-5xl font-semibold">
          {temp}°{unit === "metric" ? "C" : "F"}
        </h2>
        <div className="text-slate-400">
          {lang === "id" ? "Terasa seperti" : "Feels like"}: {feels}°
        </div>
      </div>

      {/* Info grid */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-slate-700/40 rounded-xl">
          <p className="text-sm text-slate-300">
            {lang === "id" ? "Kelembapan" : "Humidity"}
          </p>
          <p className="text-xl font-bold">{humidity}%</p>
        </div>

        <div className="p-3 bg-slate-700/40 rounded-xl">
          <p className="text-sm text-slate-300">
            {lang === "id" ? "Angin" : "Wind"}
          </p>
          <p className="text-xl font-bold">
            {wind} {unit === "metric" ? "m/s" : "mph"}
          </p>
        </div>

        <div className="p-3 bg-slate-700/40 rounded-xl">
          <p className="text-sm text-slate-300">
            {lang === "id" ? "Tekanan" : "Pressure"}
          </p>
          <p className="text-xl font-bold">{weather.main.pressure} hPa</p>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-4 text-right">
        {lang === "id" ? "Terakhir diperbarui" : "Last updated"}:{" "}
        {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}
