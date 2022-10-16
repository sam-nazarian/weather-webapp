const cityNameDom = document.querySelector('.city-name');
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

import { countryCodeEmoji } from 'country-code-emoji';

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export async function render(fetchFiveDayForecast, lat, lng, metric) {
  //fetch for data
  const data = await fetchFiveDayForecast(lat, lng);

  //render data
  cityNameDom.textContent = `Winnipeg, ${data.city.country} ${countryCodeEmoji(data.city.country)}`;
  weatherDescriptionDom.textContent = data.list[0].weather[0].description;
  tempDom.textContent = `${Math.round(data.list[0].main.temp)}°C`;
  feelsLikeTempDom.textContent = `${Math.round(data.list[0].main.feels_like)}°C`;
  iconDom.src = `src/img/icons/${data.list[0].weather[0].icon}.svg`;

  humidityValueDom.textContent = data.list[0].main.humidity;
  windSpeedValueDom.textContent = data.list[0].wind.speed;
  visibilityValueDom.textContent = data.list[0].visibility;

  //render hourly forecast
  for (let i = 0; i < 7; i++) {
    hourlyTimeDom[i].textContent = formatAMPM(new Date(data.list[i].dt * 1000));
    hourlyImgDom[i].src = `src/img/icons/${data.list[i].weather[0].icon}.svg`;
    hourlyTempDom[i].textContent = `${Math.round(data.list[i].main.temp)}°C`;
  }
}
