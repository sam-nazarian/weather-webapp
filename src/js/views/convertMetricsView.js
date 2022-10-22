const windSpeedValueDom = document.querySelector('.wind-speed-value');
const windSpeedUnitDom = document.querySelector('.wind-speed-unit');

const hourlyTempDom = Array.from(document.querySelectorAll('.hourly-temp-text'));

const fiveDayForecastTempHigh = document.querySelectorAll('.five-day-forecast-temp-high');
const fiveDayForecastTempLow = document.querySelectorAll('.five-day-forecast-temp-low');

const tempDom = document.querySelector('.temp-text');
const tempHighTextDom = document.querySelector('.temp-high-text');
const tempLowTextDom = document.querySelector('.temp-low-text');

const feelsLikeTempDom = document.querySelector('.feels-like-temp');

const tempUnitDom = Array.from(document.querySelectorAll('.temp-unit'));

// Metric Buttons
const metricDom = document.getElementById('metric');
const imperialDom = document.getElementById('imperial');

/**
 * render the tempratures of the weather
 * @param {String} metricStr the type of temprature: "metric" or "imperial"
 */
export default function convertMetrics(metricStr = 'metric') {
  let tempUnit;
  let tempFunc;
  if (metricStr === 'metric') {
    tempFunc = (kelvinTemp) => Math.round(kelvinTemp - 273.15);
    windSpeedValueDom.textContent = (windSpeedValueDom.dataset.speed * 3.6).toFixed(2);
    windSpeedUnitDom.textContent = 'km/h';
    tempUnit = '°C';
  } else if (metricStr === 'imperial') {
    tempFunc = (kelvinTemp) => Math.round((kelvinTemp - 273.15) * 1.8 + 32);
    windSpeedValueDom.textContent = (windSpeedValueDom.dataset.speed * 2.237).toFixed(2);
    windSpeedUnitDom.textContent = 'mi/h';
    tempUnit = '°F';
  }

  for (let i = 0; i < 7; i++) {
    hourlyTempDom[i].textContent = tempFunc(hourlyTempDom[i].dataset.temp);
  }

  for (let i = 0; i < 5; i++) {
    fiveDayForecastTempHigh[i].textContent = tempFunc(fiveDayForecastTempHigh[i].dataset.temp);
    fiveDayForecastTempLow[i].textContent = tempFunc(fiveDayForecastTempLow[i].dataset.temp);
  }

  tempDom.textContent = tempFunc(tempDom.dataset.temp);
  tempHighTextDom.textContent = tempFunc(tempHighTextDom.dataset.temp);
  tempLowTextDom.textContent = tempFunc(tempLowTextDom.dataset.temp);
  feelsLikeTempDom.textContent = tempFunc(feelsLikeTempDom.dataset.temp);

  for (let i = 0; i < tempUnitDom.length; i++) {
    tempUnitDom[i].textContent = tempUnit;
  }
  // console.log(tempUnitDom.length);
}

metricDom.addEventListener('click', (e) => {
  convertMetrics('metric');
});

imperialDom.addEventListener('click', (e) => {
  convertMetrics('imperial');
});
