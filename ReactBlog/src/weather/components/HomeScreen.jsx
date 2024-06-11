// src/components/weather/HomeScreen.js
import React, { useState, useEffect } from 'react';

const HomeScreen = () => {
  const [weather, setWeather] = useState(null);

  const apiKey = '7c8d88f347ddf27197fa42207105709c'


  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => setWeather(data));
      console,log(data)
  }, []);

  return (
    <div>
      <h1>Weather Dashboard</h1>
      {weather ? (
        <div>
          <p>Current Weather: {weather.weather[0].description}, {weather.main.temp}°C</p>
          <p>Real-Time Alerts: None</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default HomeScreen;
