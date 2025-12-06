import { useWeather } from "../context/WeatherContext";

export default function DailyForecast() {
  const { forecast } = useWeather();

  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] overflow-x-auto z-[999]">
      <div className="flex gap-4">
        {forecast.map((day) => (
          <div
            key={day.date}
            className="min-w-[120px] bg-white/80 backdrop-blur-md rounded-xl shadow p-3 text-center"
          >
            <p className="font-semibold">
              {new Date(day.date).toLocaleDateString("id-ID", {
                weekday: "short",
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              className="mx-auto"
            />

            <p className="text-gray-600 text-sm">
              {Math.round(day.temp_min)}° / {Math.round(day.temp_max)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
