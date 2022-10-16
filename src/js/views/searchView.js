import cities from '../../data/cities.json';
import { countryCodeEmoji } from 'country-code-emoji';
import { render } from './views/renderView.js';

const search = document.querySelector('.search');
const matchList = document.querySelector('.search-results-container');

// Search cities.json & filter it
const searchCities = async function (searchText) {
  if (searchText.length === 0) {
    // matchList.innerHTML = '';
    matchList.classList.add('hide');
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
    matchList.classList.remove('hide');

    const html = matches
      .map(
        (match) => `
        <li>
          <div class="search-result-card" data-lat="${match.lat}" data-lon="${match.lng}">
            <h4>${match.name}, ${match.country} ${countryCodeEmoji(match.country)} </h4>
            <p class="search-result-geolocation">Lat: ${match.lat} Long: ${match.lng}</p>
          </div>
        </li>
      `
      )
      .join('');

    matchList.innerHTML = html;
  }
};

// export async function searchCitiesHandler() {
search.addEventListener('input', () => searchCities(search.value));
// cities = await fetchCities();
// console.log(cities);
// }

matchList.addEventListener('click', function (e) {
  const selectedCard = e.target.closest('.search-result-card');
  if (!selectedCard) return;

  render();
  console.log(selectedCard.dataset.lat);
  console.log(selectedCard.dataset.lon);
});
