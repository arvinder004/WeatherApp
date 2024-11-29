

import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "a0455b1ba5b7048f1df0717ccd2f8d8c";

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setWeatherData(null);
        setError(data.message);
      }
    } catch (err) {
      setWeatherData(null);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 text-white p-4">
      <h1 className="text-4xl font-bold mt-6 text-center md:text-5xl">Weather App</h1>

      <div className="flex flex-col md:flex-row items-center mt-8 space-y-4 md:space-y-0 md:space-x-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded-md text-black focus:outline-none w-full md:w-auto"
        />
        <button
          onClick={getWeather}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold w-full md:w-auto"
        >
          Get Weather
        </button>
      </div>

      {error && <p className="mt-6 text-red-400 text-center">{error}</p>}

      {weatherData && (
        <div className="mt-8 bg-white text-black p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">{weatherData.name}</h2>
          <div className="text-lg space-y-2">
            <p>
              <span className="font-semibold">Weather:</span>{" "}
              <span className="capitalize">{weatherData.weather[0].description}</span>
            </p>
            <p>
              <span className="font-semibold">Temperature:</span> {weatherData.main.temp}°C
            </p>
            <p>
            <span className="font-semibold"> Feels Like:</span> {weatherData.main.feels_like}°C
            </p>
            <p>
              <span className="font-semibold">Humidity:</span> {weatherData.main.humidity}%
            </p>
            <p>
              <span className="font-semibold">Wind Speed:</span> {weatherData.wind.speed} m/s
            </p>
            <p>
              <span className="font-semibold">Visibility:</span> {weatherData.visibility}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
