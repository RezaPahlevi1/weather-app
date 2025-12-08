import DailyForecast from "../components/DailyForecast";
import FloatingLeftInfo from "../components/FloatingLeftInfo";
import FloatingSearch from "../components/FloatingSearchCity";
import FloatingWeatherCard from "../components/FloatingWeatherCard";
import FullscreenMap from "../components/FullscreenMap";
import SettingsButton from "../components/SettingsButton";

export default function App() {
  return (
    <div className="relative">
      <SettingsButton />
      <FullscreenMap />
      <FloatingSearch />
      <FloatingWeatherCard />
      <FloatingLeftInfo />
      <DailyForecast />
    </div>
  );
}
