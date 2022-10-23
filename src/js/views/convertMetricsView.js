// Import DOM
// Metric Buttons
const metricDom = document.getElementById('metric');
const imperialDom = document.getElementById('imperial');

// Left-col segment
const tempDom = document.querySelector('.temp-text');
const tempHighTextDom = document.querySelector('.temp-high-text');
const tempLowTextDom = document.querySelector('.temp-low-text');
const feelsLikeTempDom = document.querySelector('.feels-like-temp');

// Metric card segment
const windSpeedValueDom = document.querySelector('.wind-speed-value');
const windSpeedUnitDom = document.querySelector('.wind-speed-unit');

// Hourly forecast segment
const hourlyTempDom = Array.from(document.querySelectorAll('.hourly-temp-text'));

// 5-day-forecast segment
const fiveDayForecastTempHigh = document.querySelectorAll('.five-day-forecast-temp-high');
const fiveDayForecastTempLow = document.querySelectorAll('.five-day-forecast-temp-low');

// All temperature units
const tempUnitDom = Array.from(document.querySelectorAll('.temp-unit'));

/**
 * Render the temperatures of the weather & the unit sign (°C or °F)
 * @param {String} metricStr the type of temperature: "metric" or "imperial"
 */
export default function convertMetrics(metricStr = 'metric') {
  let tempUnit;
  let tempFunc;
  if (metricStr === 'metric') {
    tempUnit = '°C';
    tempFunc = (kelvinTemp) => Math.round(kelvinTemp - 273.15);

    // Set temperatures for metric card segment (wind)
    windSpeedValueDom.textContent = (windSpeedValueDom.dataset.speed * 3.6).toFixed(2);
    windSpeedUnitDom.textContent = 'km/h';
  } else if (metricStr === 'imperial') {
    tempUnit = '°F';
    tempFunc = (kelvinTemp) => Math.round((kelvinTemp - 273.15) * 1.8 + 32);

    // Set temperatures for metric card segment (wind)
    windSpeedValueDom.textContent = (windSpeedValueDom.dataset.speed * 2.237).toFixed(2);
    windSpeedUnitDom.textContent = 'mi/h';
  }

  // Set temperatures for left-col segment
  tempDom.textContent = tempFunc(tempDom.dataset.temp);
  tempHighTextDom.textContent = tempFunc(tempHighTextDom.dataset.temp);
  tempLowTextDom.textContent = tempFunc(tempLowTextDom.dataset.temp);
  feelsLikeTempDom.textContent = tempFunc(feelsLikeTempDom.dataset.temp);

  // Set temperatures for hourly forecasts
  for (let i = 0; i < 7; i++) {
    hourlyTempDom[i].textContent = tempFunc(hourlyTempDom[i].dataset.temp);
  }

  // Set temperatures for 5-day-forecasts
  for (let i = 0; i < 5; i++) {
    fiveDayForecastTempHigh[i].textContent = tempFunc(fiveDayForecastTempHigh[i].dataset.temp);
    fiveDayForecastTempLow[i].textContent = tempFunc(fiveDayForecastTempLow[i].dataset.temp);
  }

  // Set the unit sign (°C or °F)
  for (let i = 0; i < tempUnitDom.length; i++) {
    tempUnitDom[i].textContent = tempUnit;
  }
}

metricDom.addEventListener('click', (e) => {
  convertMetrics('metric');
});

imperialDom.addEventListener('click', (e) => {
  convertMetrics('imperial');
});
