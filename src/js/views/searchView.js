// Import Files
import { countryCodeEmoji } from 'country-code-emoji';
import { render } from './renderView.js';
import { byIso } from 'country-code-lookup';
import { addLoader } from './loadView';
import { showError } from './loadView';

// Import DOM
const search = document.querySelector('.search');
const matchList = document.querySelector('.search-results-container');
const inputContainer = document.querySelector('.input-container');
const locationButton = document.querySelector('.location-button');

////////////////////////////////////////////////

//cities will be set to cities.json as soon as it's fetch is complete
//this way the browser's execution doesn't stop & wait to load cities.json
let cities = undefined;

(async function () {
  const response = await window.fetch('/data/cities.json');
  cities = await response.json();
})();

// issue is webpack's loader takes a long time, does the loader takes a long time before it's hidden
// (async function () {
//   cities = await import('../../data/cities.json');
// })();

/**
 * Search in cities.json, finds cities that match with searchText, & show output the first five results to the DOM
 * @param {String} searchText the value that the user searches for eg. "winnipeg"
 */
const searchCities = async function (searchText) {
  try {
    if (searchText.length === 0) {
      if (!matchList.classList.contains('hide')) matchList.classList.add('hide');
      return;
    }

    let matches = [];
    let count = 0;
    const regex = new RegExp(`^${searchText}`, 'gi');
    for (let i = 0; i < cities.length; i++) {
      const curCity = cities[i];
      if (count < 5 && curCity.name.match(regex)) {
        count++;
        matches.push(curCity);
      } else if (count > 5) {
        break;
      }
    }

    outputHtml(matches);
  } catch (err) {
    showError('Please hold on while the autocomplete cities load!', false);
  }
};

/**
 * output the matches results by adding them to the HTML
 * @param {array} matches array of country objects which will be rendered in the html
 */
const outputHtml = function (matches) {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <li>
          <div class="search-result-card" data-lat="${match.lat}" data-lon="${match.lng}" data-city="${match.name}">
            <h4>${match.name}, ${byIso(match.country).country} ${countryCodeEmoji(match.country)} </h4>
            <p class="search-result-geolocation">Lat: ${match.lat} Long: ${match.lng}</p>
          </div>
        </li>
      `
      )
      .join('');

    if (matchList.classList.contains('hide')) matchList.classList.remove('hide');
    matchList.innerHTML = html;
  }
};

/**
 * Adds event listeners that allow the user to search for cities & click on their matched city to load it
 * @param {Function} fetchFiveDayForecast function that fetches for the 5-day-forecast of the weather
 */
export function searchCitiesHandler(fetchFiveDayForecast) {
  // When a card is clicked render it
  matchList.addEventListener('click', function (e) {
    const selectedCard = e.target.closest('.search-result-card');
    if (!selectedCard) return;

    addLoader();
    render(fetchFiveDayForecast, selectedCard.dataset.lat, selectedCard.dataset.lon);

    search.value = '';
    matchList.classList.add('hide');
    locationButton.classList.remove('location-button-active');
  });

  // When an input is added search for cities
  search.addEventListener('input', () => searchCities(search.value));

  // When the focus is on search
  search.addEventListener('focus', () => {
    if (search.value.length >= 1 && matchList.classList.contains('hide')) matchList.classList.remove('hide');
  });

  // Remove search when outside the search area is clicked
  window.addEventListener('click', function (e) {
    if (!inputContainer.contains(e.target) && !matchList.classList.contains('hide')) matchList.classList.add('hide');
  });
}
