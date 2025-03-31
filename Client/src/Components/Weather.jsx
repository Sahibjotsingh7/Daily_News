import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { IoIosSearch, IoMdCloudy, IoMdRainy, IoMdSpeedometer, IoMdCompass, IoMdThermometer } from "react-icons/io";

const Weather = () => {
  const [city, setCity] = useState('Delhi'); // Default city is Delhi
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const API_KEY = 'efbf4b613e8abf9f7bdfb274a70a7df1';

  // Fetch weather data on component mount
  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    setError('');
    setWeather(null);
    setForecast(null);

    try {
      // Fetch current weather
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(weatherResponse.data);

      // Fetch forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecast(forecastResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching weather data');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') fetchWeather();
  };

  const formatTime = (hours) => {
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12} ${period}`;
  };

  const displayHourlyForecast = (list) => {
    return list.slice(0, 8).map((item, index) => {
      const date = new Date(item.dt * 1000);
      const hour = date.getHours();
      const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
      const rainPercentage = Math.round(item.pop * 100);

      return (
        <div key={index} className="weather-forecast-item">
          <p>{formatTime(hour)}</p>
          <img src={iconUrl} alt="Weather icon" />
          <p>{Math.round(item.main.temp)}°C</p>
          <p>Rain: {rainPercentage}%</p>
          <p>{item.weather[0].description}</p>
        </div>
      );
    });
  };

  const displayWeeklyForecast = (list) => {
    const dailyData = {};
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.getDay();
      if (!dailyData[day]) {
        dailyData[day] = {
          temp: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          pop: item.pop,
        };
      }
    });

    const today = new Date().getDay();
    return Array.from({ length: 7 }, (_, i) => {
      const dayIndex = (today + i) % 7;
      if (!dailyData[dayIndex]) return null;
      const iconUrl = `https://openweathermap.org/img/wn/${dailyData[dayIndex].icon}.png`;
      const rainPercentage = Math.round(dailyData[dayIndex].pop * 100);

      return (
        <div key={dayIndex} className="weather-forecast-item">
          <p>{days[dayIndex]}</p>
          <img src={iconUrl} alt="Weather icon" />
          <p>{Math.round(dailyData[dayIndex].temp)}°C</p>
          <p>Rain: {rainPercentage}%</p>
          <p>{dailyData[dayIndex].description}</p>
        </div>
      );
    });
  };

  return (
    <div className="weather-app-page">
      <div className="weather-search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name..."
        />
        <button onClick={fetchWeather}>
          <IoIosSearch /> Search
        </button>
      </div>
      <div className="weather-container">
        {error && <div className="weather-error">{error}</div>}

        {weather && (
          <div className="weather-current">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
              className="weather-icon"
            />
            <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
            <p>{weather.weather[0].description}</p>

            {/* General Details Section */}
            <div className="general-details">
              <div className="detail-item">
                <IoMdThermometer /> <span>Feels Like: {Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="detail-item">
                <IoMdCloudy /> <span>Cloudiness: {weather.clouds.all}%</span>
              </div>
              <div className="detail-item">
                <IoMdRainy /> <span>Precipitation: {weather.rain ? `${weather.rain['1h']} mm` : 'None'}</span>
              </div>
              <div className="detail-item">
                <IoMdSpeedometer /> <span>Wind Speed: {weather.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <IoMdCompass /> <span>Wind Direction: {weather.wind.deg}°</span>
              </div>
              <div className="detail-item">
                <IoMdThermometer /> <span>Humidity: {weather.main.humidity}%</span>
              </div>
            </div>
          </div>
        )}

        {forecast && (
          <div className="other_weather">
            <div className="weather-forecast-section">
              <h3>Hourly Forecast</h3>
              <div className="weather-forecast-grid">{displayHourlyForecast(forecast.list)}</div>
            </div>
            <div className="weather-forecast-section">
              <h3>Weekly Forecast</h3>
              <div className="weather-forecast-grid">{displayWeeklyForecast(forecast.list)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;