// Import Files
import convertMetrics from './convertMetricsView';
import { byIso } from 'country-code-lookup';
import { countryCodeEmoji } from 'country-code-emoji';
import { hideLoader, showError } from './loadView';
import ts from '@mapbox/timespace';

// Import DOM
// Left-col segment
const cityNameDom = document.querySelector('.city-name');
const countryNameDom = document.querySelector('.country-name');
const weatherDescriptionDom = document.querySelector('.weather-description');
const tempDom = document.querySelector('.temp-text');
const iconDom = document.querySelector('.icon');
const tempHighTextDom = document.querySelector('.temp-high-text');
const tempLowTextDom = document.querySelector('.temp-low-text');
const feelsLikeTempDom = document.querySelector('.feels-like-temp');

// Metric Buttons
const metricDom = document.getElementById('metric');
const imperialDom = document.getElementById('imperial');

// Metric card segment
const dateDom = document.querySelector('.date');
const humidityValueDom = document.querySelector('.humidity-value');
const windSpeedValueDom = document.querySelector('.wind-speed-value');
const sunriseValueDom = document.querySelector('.sunrise-value');
const sunsetValueDom = document.querySelector('.sunset-value');
const sunriseUnitDom = document.querySelector('.sunrise-unit');
const sunsetUnitDom = document.querySelector('.sunset-unit');

// Hourly forecast segment
const hourlyTimeDom = Array.from(document.querySelectorAll('.hourly-time'));
const hourlyImgDom = Array.from(document.querySelectorAll('.hourly-img'));
const hourlyTempDom = Array.from(document.querySelectorAll('.hourly-temp-text'));

// 5-day-forecast segment
const fiveDayForecastDayDom = document.querySelectorAll('.five-day-forecast-day');
const fiveDayForecastImgDom = document.querySelectorAll('.five-day-forecast-img');
const fiveDayForecastTempHigh = document.querySelectorAll('.five-day-forecast-temp-high');
const fiveDayForecastTempLow = document.querySelectorAll('.five-day-forecast-temp-low');

// Hide Render Information
const hideRenderInfoDom = document.querySelectorAll('.hide-render-info');
const hideRightColDom = document.querySelector('.hide-right-col');

//////////////////////////

/**
 * Renders weather information based on location by changing the DOM
 * @param {Function} fetchFiveDayForecast function that fetches for the 5-day-forecast of the weather
 * @param {String} lat latitude
 * @param {String} lng longitude
 */
export async function render(fetchFiveDayForecast, lat, lng) {
  try {
    // Fetch data
    const data = await fetchFiveDayForecast(lat, lng);

    // Render left-col
    cityNameDom.textContent = `${data.city.name}`;
    countryNameDom.textContent = `${byIso(data.city.country).country} ${countryCodeEmoji(data.city.country)}`;
    weatherDescriptionDom.textContent = data.list[0].weather[0].description;
    tempDom.dataset.temp = Math.round(data.list[0].main.temp);
    iconDom.src = `src/img/icons/${data.list[0].weather[0].icon}.svg`;
    const [maxTemp, minTemp] = findMinAndMaxTemp(0, data);
    tempHighTextDom.dataset.temp = maxTemp;
    tempLowTextDom.dataset.temp = minTemp;
    feelsLikeTempDom.dataset.temp = Math.round(data.list[0].main.feels_like);

    // Render metric cards
    dateDom.textContent = getTodaysFullDate(new Date(), lat, lng);

    humidityValueDom.textContent = data.list[0].main.humidity;
    windSpeedValueDom.dataset.speed = data.list[0].wind.speed;

    const [sunriseTime, sunriseUnit] = getCurrentTime(new Date(data.city.sunrise * 1000), lat, lng).split(' ');
    const [sunsetTime, sunsetUnit] = getCurrentTime(new Date(data.city.sunset * 1000), lat, lng).split(' ');
    sunriseValueDom.textContent = sunriseTime;
    sunsetValueDom.textContent = sunsetTime;
    sunriseUnitDom.textContent = sunriseUnit;
    sunsetUnitDom.textContent = sunsetUnit;

    // Render hourly & 5-day forecasts
    renderHourlyForecast(data, lat, lng);
    renderFiveDayForecast(data, lat, lng);

    // Render temperatures & unit signs (°C or °F)
    if (metricDom.checked) convertMetrics('metric');
    else if (imperialDom.checked) convertMetrics('imperial');

    hideRenderInfo();
    hideLoader();
  } catch (err) {
    //incase fetchFiveDayForecast() gets rejected
    showError('Failed to load weather, please retry later!');
    hideLoader();
  }
}

//////////////////////////
// Helper Functions

/**
 * Updates hour of days based on current date/time
 * Updates hourly forecasts weather icon.
 * Stores hourly forecasts temperature's information in html's dataset.
 *
 * @param {Object} data result of the HourlyForecast fetch
 * @param {String} lat latitude
 * @param {String} lng longitude
 */
function renderHourlyForecast(data, lat, lng) {
  for (let i = 0; i < 7; i++) {
    hourlyTimeDom[i].textContent = getCurrentTime(new Date(data.list[i].dt * 1000), lat, lng);
    hourlyImgDom[i].src = `src/img/icons/${data.list[i].weather[0].icon}.svg`;
    hourlyTempDom[i].dataset.temp = `${Math.round(data.list[i].main.temp)}`;
  }
}

/**
 * Updates days of week based on current date.
 * Updates 5-day forecasts weather icon.
 * Stores 5-day forecasts temperature's information in html's dataset.
 *
 * @param {Object} data result of the HourlyForecast fetch
 * @param {String} lat latitude
 * @param {String} lng longitude
 */
function renderFiveDayForecast(data, lat, lng) {
  // j is pointing to current 5-day-forecast being edited
  let j = 0;

  // i is pointing to each start of day in data (as temp gets updated every 3 hours, the start of a new day will be after 8 * 3-hour segments)
  for (let i = 0; i < 40; i += 8) {
    if (j === 0) fiveDayForecastDayDom[j].textContent = 'Today';
    else fiveDayForecastDayDom[j].textContent = getTodaysWeekDayName(new Date(data.list[i].dt * 1000), lat, lng);

    fiveDayForecastImgDom[j].src = `src/img/icons/${data.list[i].weather[0].icon.replace('n', 'd')}.svg`; //remove 'n' from weather

    const [maxTemp, minTemp] = findMinAndMaxTemp(i, data);
    fiveDayForecastTempHigh[j].dataset.temp = maxTemp;
    fiveDayForecastTempLow[j].dataset.temp = minTemp;
    j++;
  }
}

/**
 * Convert the time to am/pm format eg. "11:56 am"
 * @param {Object} internationalTime a moment-timezone object Object which is returned from ts.getFuzzyLocalTimeFromPoint()
 * @returns {String} the formatted time eg. "11:56 am"
 */
function formatTimeAMPM(internationalTime) {
  let hours = internationalTime.hours();
  let minutes = internationalTime.minutes();

  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

/**
 * Get the current time of location based on the longitude & latitude in am/pm format & return it
 * @param {Object} date Date instance returned from Date() constructor
 * @param {String} lat latitude
 * @param {String} lng longitude
 * @returns {String} current time of location in am/pm format eg. "11:56 am"
 */
function getCurrentTime(date, lat, lng) {
  const internationalTime = ts.getFuzzyLocalTimeFromPoint(date, [lng, lat]);
  return formatTimeAMPM(internationalTime);
}

/**
 * Return todays date in string format eg. "Sat, Oct 22, 2022, 5:10 am"
 * @param {Object} date Date instance returned from Date() constructor
 * @param {String} lat latitude
 * @param {String} lng longitude
 * @returns {String} todays date in string format eg. "Sat, Oct 22, 2022, 5:10 am"
 */
function getTodaysFullDate(date, lat, lng) {
  const internationalTime = ts.getFuzzyLocalTimeFromPoint(date, [lng, lat]);

  const hours = formatTimeAMPM(internationalTime);
  const [day, month, dateVal, year] = internationalTime.toString().split(' ');
  const str = `${day}, ${month} ${dateVal}, ${year}, ${hours}`;

  return str;
}

/**
 * return today's name of day eg. "Mon"
 * @param {Object} date Date instance returned from Date() constructor
 * @param {String} lat latitude
 * @param {String} lng longitude
 * @returns {String} today's name of day eg. "Mon"
 */
function getTodaysWeekDayName(date, lat, lng) {
  const internationalTime = ts.getFuzzyLocalTimeFromPoint(date, [lng, lat]);
  const [day] = internationalTime.toString().split(' ');

  return day;
}

/**
 * Go through data arr & find min & max temp for that day
 * @param {Number} startIdx where to start searching from (in the data array)
 * @param {Object} data the data object to look for the temperature
 * @returns {Array} [highestTemp, lowestTemp] highest/lowest temps within a 24-hour period after the start time
 */
function findMinAndMaxTemp(startIdx, data) {
  let maxTemp = -Infinity;
  let minTemp = Infinity;

  //loop through something for 8 times
  for (let i = startIdx; i < startIdx + 8; i++) {
    maxTemp = Math.max(maxTemp, data.list[i].main.temp);
    minTemp = Math.min(minTemp, data.list[i].main.temp);
  }

  return [Math.round(maxTemp), Math.round(minTemp)];
}

/**
 * hide render information
 */
function hideRenderInfo() {
  hideRenderInfoDom.forEach((el) => {
    el.classList.remove('hide-render-info');
  });

  hideRightColDom.classList.remove('hide-right-col');
}
