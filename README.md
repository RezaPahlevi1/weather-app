# 🌤️ Weather App --- React + Tailwind CSS

A clean and responsive weather application built with **React** and
**Tailwind CSS**, designed to provide quick and accurate weather
information based on user-selected locations.\
This project serves as practical training for working with APIs,
managing state in React, and building modern UI components.

## ✨ Features

### 🔍 City Search

Users can search for any city, and the app will fetch real-time weather
data using the OpenWeather API.

### 🌡️ Weather Information Display

The app shows: - Temperature (°C) - Weather condition - Weather icon -
Optional details (humidity, wind speed)

### ⚠️ Error Handling

If a city is not found or the API returns an error, the app displays a
friendly error message.

## 🗂️ Project Structure

    weather-app/
    │
    ├── src/
    │   ├── components/
    │   │   ├── DailyForecast.jsx
    │   │   ├── FullscreenMap.jsx
    │   │   ├── SearchCity.jsx
    │   │   ├── SettingsButton.jsx
    │   │   ├── SettingsPanel.jsx
    │   │   └── WeatherCard.jsx
    │   ├── context/
    │   │   └── WeatherContext.jsx
    │   │   └── SettingsContext.jsx
    │   ├── api/
    │   │   └── weather.js
    │   ├── pages/
    │   │   └── Home.jsx
    │   ├── utils/
    │   │   └── debounce.js
    │   │   └── storage.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    │
    ├── public/
    │
    ├── package.json
    └── README.md

## 🌐 API Used

This project uses the **OpenWeather API**.

## 🔄 App Flow

1.  User types a city name in the search bar.\
2.  The app sends a request to the OpenWeather API.\
3.  The API returns JSON weather data.\
4.  Information is displayed on the WeatherCard.\
5.  If the API returns an error, a fallback message is shown.

## 🎯 Project Goals

This project is created to practice: - Building reusable components in
React\

- Handling REST API requests\
- Managing global state with React Context\
- Creating responsive layouts using Tailwind CSS\
- Designing an application from scratch with clean UX

## 📄 License

This project is open-source and free to use.
