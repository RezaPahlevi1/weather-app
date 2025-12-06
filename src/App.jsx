import { SettingsProvider } from "./context/SettingsContext";
import { WeatherProvider } from "./context/WeatherContext";
import TestWeather from "./pages/TestWeather";

function App() {
  return (
    <SettingsProvider>
      <WeatherProvider>
        <TestWeather />
      </WeatherProvider>
    </SettingsProvider>
  );
}

export default App;
