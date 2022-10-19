import { OPENWEATHER_API_KEY } from './config.js';

export async function fetchFiveDayForecast(lat, lon) {
  const getWeatherData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`);
  const data = await getWeatherData.json();
  return data;
}

export async function fetchLocationBasedOnIP() {
  const getLatLongData = await fetch(`https://geolocation-db.com/json/`);
  const { latitude, longitude } = await getLatLongData.json();

  return { latitude, longitude };
}
