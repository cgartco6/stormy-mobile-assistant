import axios from 'axios';
import { OPENWEATHER_API_KEY } from '@env';

export async function getWeather(city = null, lat = null, lon = null) {
  let url;
  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  } else {
    throw new Error('No location provided');
  }
  const response = await axios.get(url);
  const data = response.data;
  const temp = Math.round(data.main.temp);
  const desc = data.weather[0].description;
  const cityName = data.name;
  return `In ${cityName}, it's ${temp} degrees with ${desc}. ${getWeatherFlirty()}`;
}

function getWeatherFlirty() {
  const lines = ["Don't forget your jacket, cutie.", "Perfect weather for a drive with me.", "Hotter than me? Nah."];
  return lines[Math.floor(Math.random() * lines.length)];
}
