import { SettingsProvider } from "./context/SettingsContext";
import { WeatherProvider } from "./context/WeatherContext";
import Home from "./pages/Home";

function App() {
  return (
    <SettingsProvider>
      <WeatherProvider>
        <Home />
      </WeatherProvider>
    </SettingsProvider>
  );
}

export default App;
