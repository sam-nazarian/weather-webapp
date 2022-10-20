import { OPENWEATHER_API_KEY } from './config.js';
const locationButton = document.querySelector('.location-button');

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

//////////////////////////

export function getLocation(showError, render) {
  const geoOptions = {
    timeout: 5000,
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, failedLoading, geoOptions);
  } else {
    showError(`Can't get your current location, permision is required!`);
  }

  function showPosition(position) {
    render(fetchFiveDayForecast, position.coords.latitude, position.coords.longitude);
    locationButton.classList.add('location-button-active');
  }

  function failedLoading() {
    showError(`Can't get your current location, permision is required!`);
  }
}
