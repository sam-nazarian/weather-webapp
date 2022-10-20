// import cities from '../../data/cities.json';
import { countryCodeEmoji } from 'country-code-emoji';
import { render } from './renderView.js';
import { byIso } from 'country-code-lookup';

const search = document.querySelector('.search');
const matchList = document.querySelector('.search-results-container');
const inputContainer = document.querySelector('.input-container');
const locationButton = document.querySelector('.location-button');

//cities will be set to cities.json as soon as it's fetch is complete
//this way the browser's execution doesn't stop & wait to load cities.json
let cities = undefined;
(async function () {
  cities = await import('../../data/cities.json');
})();

// Search cities.json & filter it
const searchCities = async function (searchText) {
  if (searchText.length === 0) {
    // matchList.innerHTML = '';
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
};

// Show results in HTML
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

export function searchCitiesHandler(fetchFiveDayForecast) {
  // When a card is clicked render it
  matchList.addEventListener('click', function (e) {
    const selectedCard = e.target.closest('.search-result-card');
    if (!selectedCard) return;

    render(fetchFiveDayForecast, selectedCard.dataset.lat, selectedCard.dataset.lon, true);

    search.value = '';
    matchList.classList.add('hide');
    locationButton.classList.remove('location-button-active');

    // console.log(selectedCard.dataset.city);
    // console.log(selectedCard.dataset.lat);
    // console.log(selectedCard.dataset.lon);
  });

  // When an input is added search for cities
  search.addEventListener('input', () => searchCities(search.value));

  // When the focus is on search
  search.addEventListener('focus', () => {
    if (search.value.length >= 1 && matchList.classList.contains('hide')) matchList.classList.remove('hide');
  });

  // Remove search when outside is clicked
  window.addEventListener('click', function (e) {
    // Clicked outside search box
    if (!inputContainer.contains(e.target) && !matchList.classList.contains('hide')) matchList.classList.add('hide');
  });
}
