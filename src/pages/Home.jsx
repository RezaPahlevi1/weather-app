import DailyForecast from "../components/DailyForecast";
import FullscreenMap from "../components/FullscreenMap";
import SearchCity from "../components/SearchCity";
import SettingsButton from "../components/SettingsButton";
import WeatherCard from "../components/WeatherCard";

export default function App() {
  return (
    <div className="relative">
      <SettingsButton />
      <FullscreenMap />
      <SearchCity />
      <WeatherCard />
      <DailyForecast />
    </div>
  );
}
