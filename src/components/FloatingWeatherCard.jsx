import WeatherCard from "./WeatherCard";

export default function FloatingWeatherCard() {
  return (
    <div className="fixed top-4 right-4 z-999 w-[300px]">
      <WeatherCard />
    </div>
  );
}
