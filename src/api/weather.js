const API_KEY = "163a49d7b685ef39f5babc06985a848b";

export async function getWeather(lat, lon, unit = "metric", lang = "eng") {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}&appid=${API_KEY}`
  );
  return res.json();
}

export async function searchCity(query) {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to search city");
  return res.json();
}

export async function getForecast(lat, lon, unit = "metric", lang = "en") {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&lang=${lang}&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to get forecast");
  return res.json();
}
