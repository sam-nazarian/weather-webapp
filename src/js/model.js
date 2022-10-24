// Import Files
import { OPENWEATHER_API_KEY } from './config.js';

// Import DOM
const locationButton = document.querySelector('.location-button');

////////////////////////////////////////////////

/**
 * Fetch the 5-day weather forecast from openweathermap's API
 * @param {String} lat latitude
 * @param {String} lon longitude
 * @returns {Object} data result of the fetch
 */
export async function fetchFiveDayForecast(lat, lon) {
  try {
    const getWeatherData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`);
    const data = await getWeatherData.json();
    return data;
  } catch (err) {
    throw err;
  }
}

/**
 * fetches latitude & longitude based on user's IP address without required permission
 * @returns {Object} {latitude, longitude}
 */
export async function fetchLocationBasedOnIP() {
  try {
    const getLatLongData = await fetch(`https://geolocation-db.com/json/`);
    const { latitude, longitude } = await getLatLongData.json();

    return { latitude, longitude };
  } catch (err) {
    throw err;
  }
}

/**
 * Render weather based on user's geolocation data that's gathered from the geolocation API
 * @param {Function} showError function that shows error on the screen
 * @param {Function} render function that renders the weather
 * @param {Function} hideLoader function that hides the loader & blury screen, when the weather is rendered
 */
export function getLocation(showError, render, hideLoader) {
  const geoOptions = {
    timeout: 10000,
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
