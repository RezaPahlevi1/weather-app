import DailyForecast from "../components/DailyForecast";
import FloatingLeftInfo from "../components/FloatingLeftInfo";
import FloatingSearch from "../components/FloatingSearchCity";
import FloatingWeatherCard from "../components/FloatingWeatherCard";
import FullscreenMap from "../components/FullscreenMap";

export default function App() {
  return (
    <div className="relative">
      <FullscreenMap />
      <FloatingSearch />
      <FloatingWeatherCard />
      <FloatingLeftInfo />
      <DailyForecast />
    </div>
  );
}
