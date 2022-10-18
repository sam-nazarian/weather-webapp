import { byIso } from 'country-code-lookup';
import { countryCodeEmoji } from 'country-code-emoji';
import ts from '@mapbox/timespace';

const cityNameDom = document.querySelector('.city-name');
const countryNameDom = document.querySelector('.country-name');
const dateDom = document.querySelector('.date');

const weatherDescriptionDom = document.querySelector('.weather-description');
const iconDom = document.querySelector('.icon');
const tempDom = document.querySelector('.temp');
const feelsLikeDom = document.querySelector('.feels-like');
const feelsLikeTempDom = document.querySelector('.feels-like-temp');
const humidityValueDom = document.querySelector('.humidity-value');
const windSpeedValueDom = document.querySelector('.wind-speed-value');
const visibilityValueDom = document.querySelector('.visibility-value');
const sunriseValueDom = document.querySelector('.sunrise-value');

// const hourlyCard = document.querySelectorAll('.hourly-card');
const hourlyTimeDom = Array.from(document.querySelectorAll('.hourly-time'));
const hourlyImgDom = Array.from(document.querySelectorAll('.hourly-img'));
const hourlyTempDom = Array.from(document.querySelectorAll('.hourly-temp'));

function getHours(internationalTime) {
  let hours = internationalTime.hours();
  let minutes = internationalTime.minutes();

  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function formatAMPM(date, lat, lng) {
  const internationalTime = ts.getFuzzyLocalTimeFromPoint(date, [lng, lat]);
  return getHours(internationalTime);
}

function formatTodaysDate(date, lat, lng) {
  const internationalTime = ts.getFuzzyLocalTimeFromPoint(date, [lng, lat]);

  const hours = getHours(internationalTime);
  const [day, month, dateVal, year] = internationalTime.toString().split(' ');
  const str = `${day}, ${month} ${dateVal}, ${year}, ${hours}`;

  return str;
}

export async function render(fetchFiveDayForecast, lat, lng, metric) {
  //fetch for data
  const data = await fetchFiveDayForecast(lat, lng);

  dateDom.textContent = formatTodaysDate(new Date(), lat, lng);

  //render data
  cityNameDom.textContent = `${data.city.name}`;
  countryNameDom.textContent = `${byIso(data.city.country).country} ${countryCodeEmoji(data.city.country)}`;
  weatherDescriptionDom.textContent = data.list[0].weather[0].description;
  tempDom.textContent = `${Math.round(data.list[0].main.temp)}°C`;
  feelsLikeTempDom.textContent = `${Math.round(data.list[0].main.feels_like)}°C`;
  iconDom.src = `src/img/icons/${data.list[0].weather[0].icon}.svg`;

  humidityValueDom.textContent = data.list[0].main.humidity;
  windSpeedValueDom.textContent = data.list[0].wind.speed;
  visibilityValueDom.textContent = data.list[0].visibility;

  //render hourly forecast
  for (let i = 0; i < 7; i++) {
    hourlyTimeDom[i].textContent = formatAMPM(new Date(data.list[i].dt * 1000), lat, lng);
    hourlyImgDom[i].src = `src/img/icons/${data.list[i].weather[0].icon}.svg`;
    hourlyTempDom[i].textContent = `${Math.round(data.list[i].main.temp)}°C`;
  }
}
