import { OPENWEATHER_API_KEY } from './config.js';
const locationButton = document.querySelector('.location-button');

export async function fetchFiveDayForecast(lat, lon) {
  try {
    const getWeatherData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`);
    const data = await getWeatherData.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function fetchLocationBasedOnIP() {
  try {
    const getLatLongData = await fetch(`https://geolocation-db.com/json/`);
    const { latitude, longitude } = await getLatLongData.json();

    return { latitude, longitude };
  } catch (err) {
    throw err;
  }
}

//////////////////////////

export function getLocation(showError, render, hideLoader) {
  const geoOptions = {
    timeout: 5000,
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, failedLoading, geoOptions);
  } else {
    hideLoader();
    showError(`Can't get your current location, permission is required!`);
  }

  function showPosition(position) {
    render(fetchFiveDayForecast, position.coords.latitude, position.coords.longitude);
    hideLoader();
    locationButton.classList.add('location-button-active');
  }

  function failedLoading() {
    hideLoader();
    showError(`Can't get your current location, permission is required!`);
  }
}
