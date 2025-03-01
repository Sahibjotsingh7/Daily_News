import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  WiDaySunny, WiNightClear, WiDayCloudy, WiNightAltCloudy,
  WiDayRainMix, WiNightAltRain, WiDayRainWind, WiNightAltRainWind,
  WiDayThunderstorm, WiNightAltThunderstorm, WiDaySnow, WiNightAltSnow,
  WiSnowWind, WiDayFog, WiNightFog, WiTornado, WiHurricane,
  WiDayWindy, WiNightAltCloudyGusts, WiHot, WiSnowflakeCold,
  WiDayHaze,
} from "react-icons/wi";
import { FaSearch, FaTint, FaWind, FaCloud, FaSmog, FaThermometerHalf } from "react-icons/fa";
import { MdOutlineDirections } from "react-icons/md";

const Weather = () => {
  const [city, setCity] = useState('New Delhi');
  const [weather, setWeather] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const API_KEY = 'a63ca14799860e61239e2f25fa9d210b';

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const getWeatherIcon = (weatherType, isDay) => {
    const normalizedType = normalizeWeatherType(weatherType);
    const icons = isDay ? dayWeatherIcons : nightWeatherIcons;
    const matchedIcon = icons.find((icon) => icon.type === normalizedType);
    return matchedIcon ? matchedIcon.icon : (isDay ? <WiDaySunny /> : <WiNightClear />);
  };

  const normalizeWeatherType = (type) => {
    switch (type.toLowerCase()) {
      case 'clear': return 'sunny';
      case 'clouds': return 'cloudy';
      case 'rain': return 'light rain';
      case 'thunderstorm': return 'thunderstorm';
      case 'snow': return 'snow';
      case 'mist':
      case 'haze':
      case 'smoke': return 'haze';
      case 'tornado': return 'tornado';
      case 'squall': return 'windy';
      default: return 'sunny';
    }
  };

  const dayWeatherIcons = [
    { type: "sunny", icon: <WiDaySunny color='#FFD700' />, background: '#87CEEB' },
    { type: "cloudy", icon: <WiDayCloudy color='#808080' />, background: '#B0C4DE' },
    { type: "light rain", icon: <WiDayRainMix color='#4682B4' />, background: '#A9A9A9' },
    { type: "heavy rain", icon: <WiDayRainWind color='#1E90FF' />, background: '#696969' },
    { type: "thunderstorm", icon: <WiDayThunderstorm color='#FFD700' />, background: '#483D8B' },
    { type: "snow", icon: <WiDaySnow color='#FFFFFF' />, background: '#B0C4DE' },
    { type: "blizzard", icon: <WiSnowWind color='#F0F8FF' />, background: '#778899' },
    { type: "fog", icon: <WiDayFog color='#D3D3D3' />, background: '#C0C0C0' },
    { type: "tornado", icon: <WiTornado color='#696969' />, background: '#708090' },
    { type: "hurricane", icon: <WiHurricane color='#4169E1' />, background: '#2F4F4F' },
    { type: "windy", icon: <WiDayWindy color='#B0C4DE' />, background: '#87CEFA' },
    { type: "hot", icon: <WiHot color='#FF4500' />, background: '#FFA500' },
    { type: "cold", icon: <WiSnowflakeCold color='#00B7EB' />, background: '#E6E6FA' },
    { type: "haze", icon: <WiDayHaze color='#DAA520' />, background: '#F0F8FF' },
  ];

  const nightWeatherIcons = [
    { type: "sunny", icon: <WiNightClear color='#F0F8FF' />, background: '#191970' },
    { type: "cloudy", icon: <WiNightAltCloudy color='#696969' />, background: '#2F4F4F' },
    { type: "light rain", icon: <WiNightAltRain color='#6495ED' />, background: '#483D8B' },
    { type: "heavy rain", icon: <WiNightAltRainWind color='#4169E1' />, background: '#2F4F4F' },
    { type: "thunderstorm", icon: <WiNightAltThunderstorm color='#FFFF00' />, background: '#191970' },
    { type: "snow", icon: <WiNightAltSnow color='#FFFFFF' />, background: '#483D8B' },
    { type: "blizzard", icon: <WiSnowWind color='#F0F8FF' />, background: '#696969' },
    { type: "fog", icon: <WiNightFog color='#C0C0C0' />, background: '#2F4F4F' },
    { type: "tornado", icon: <WiTornado color='#696969' />, background: '#483D8B' },
    { type: "hurricane", icon: <WiHurricane color='#4169E1' />, background: '#191970' },
    { type: "windy", icon: <WiNightAltCloudyGusts color='#B0C4DE' />, background: '#2F4F4F' },
    { type: "hot", icon: <WiHot color='#FF4500' />, background: '#FF8C00' },
    { type: "cold", icon: <WiSnowflakeCold color='#00B7EB' />, background: '#483D8B' },
    { type: "haze", icon: <WiNightFog color='#DAA520' />, background: '#191970' },
  ];

  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity);
      setSearchCity('');
    }
  };

  const getLocalTimeInfo = (timezoneOffset, sunrise, sunset) => {
    // Get current UTC time
    const now = new Date();
    // Calculate local time by adding timezone offset (in seconds)
    const localTime = new Date(now.getTime() + (timezoneOffset * 1000));
    // Adjust for user's local timezone offset to display correctly
    const utcOffset = now.getTimezoneOffset() * 60 * 1000; // Convert minutes to milliseconds
    const adjustedTime = new Date(localTime.getTime() - utcOffset);
    
    // Convert sunrise and sunset (Unix timestamps in seconds) to milliseconds and adjust
    const sunriseTime = new Date((sunrise * 1000) - utcOffset);
    const sunsetTime = new Date((sunset * 1000) - utcOffset);
    
    // Determine if it's day or night
    const isDay = adjustedTime >= sunriseTime && adjustedTime < sunsetTime;

    return {
      day: adjustedTime.toLocaleDateString(undefined, { weekday: 'long' }),
      date: adjustedTime.toLocaleDateString(),
      time: adjustedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDay: isDay
    };
  };

  if (!weather) return <div className="loading">Loading Weather Data...</div>;

  const { name, sys, main, weather: weatherDetails, wind, clouds, visibility, timezone } = weather;
  const weatherType = weatherDetails[0].main.toLowerCase();
  const description = weatherDetails[0].description;
  const { day, date: formattedDate, time: formattedTime, isDay } = getLocalTimeInfo(timezone, sys.sunrise, sys.sunset);
  const feelsLike = main.feels_like;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const windDirection = wind.deg;
  const cloudiness = clouds.all;
  const AQI = Math.floor(Math.random() * 201); // Placeholder for AQI

  return (
    <div className="weather-component">
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Enter city name..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <FaSearch size={20} />
        </button>
      </form>

      <div className="weather-container">
        <div className="main-info">
          <div className="location-temp">
            <p className="location">{name}, {sys.country}</p>
            <p className='location-temp-inner'>
              <span className="temp-icon">{getWeatherIcon(weatherType, isDay)}</span>
              <span className="temp">{Math.round(main.temp)}</span>
            </p>
          </div>
          <p className="description">{description.charAt(0).toUpperCase() + description.slice(1)}</p>
          <p className="date-time">{day}, {formattedDate} | {formattedTime}</p>
        </div>

        <div className="weather-details">
          <div className="weather-item">
            <p><FaThermometerHalf size={20} color="#ff3333" /> Feels Like</p>
            <p>{Math.round(feelsLike)}°C</p>
          </div>
          <div className="weather-item">
            <p><FaTint size={20} color="#ff3333" /> Humidity</p>
            <p>{humidity}%</p>
          </div>
          <div className="weather-item">
            <p><FaWind size={20} color="#ff3333" /> Wind Speed</p>
            <p>{windSpeed} m/s</p>
          </div>
          <div className="weather-item">
            <p><MdOutlineDirections size={20} color="#ff3333" /> Wind Direction</p>
            <p>{getWindDirection(windDirection)} ({windDirection}°)</p>
          </div>
          <div className="weather-item">
            <p><FaCloud size={20} color="#ff3333" /> Cloudiness</p>
            <p>{cloudiness}%</p>
          </div>
          <div className="weather-item">
            <p><FaSmog size={20} color="#ff3333" /> Air Quality</p>
            <p>{AQI}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;