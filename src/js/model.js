import { OPENWEATHER_API_KEY } from './config.js';

export async function fetchFiveDayForecast(lat, lon) {
  const getWeatherData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`);
  const data = await getWeatherData.json();
  return data;
}

// export async function fetchCities() {
//   console.log(city);
//   const res = await fetch('cities.json');
//   cities = await res.json();

//   console.log(cities);
//   return cities;
// }