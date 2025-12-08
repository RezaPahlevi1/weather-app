// components/DailyForecast.jsx
import { useWeather } from "../context/WeatherContext";
import { useSettings } from "../context/SettingsContext";

export default function DailyForecast() {
  const { forecast } = useWeather();
  const { lang } = useSettings();

  if (!forecast || forecast.length === 0) return null;

  const getShortDay = (date) => {
    return new Date(date).toLocaleDateString(
      lang === "id" ? "id-ID" : "en-US",
      { weekday: "long" }
    );
  };

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-999
        backdrop-blur-xl bg-slate-800/40 border-t border-white/10
        h-[90px] flex items-center
      "
    >
      <div className="flex overflow-x-auto gap-3 px-4 pb-1 w-full justify-center">
        {forecast.map((day) => (
          <div
            key={day.date}
            className="
              flex flex-col items-center justify-center
              min-w-[78px] p-2 rounded-md bg-white/5
            "
          >
            <span className="text-white text-[12px] font-medium leading-tight">
              {getShortDay(day.date)}
            </span>

            <img
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              className="w-8 h-8 my-1"
              alt={day.description}
            />

            <span className="text-white/80 text-[12px] leading-tight">
              {Math.round(day.temp_min)}° / {Math.round(day.temp_max)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
