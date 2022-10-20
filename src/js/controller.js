// Styles
import generalStyle from '../css/general.css';
import mainStyle from '../css/main.css';

// Files
import { fetchFiveDayForecast, fetchLocationBasedOnIP, getLocation } from './model.js';
import { render } from './views/renderView.js';
import { searchCitiesHandler } from './views/searchView.js';
import { findLocation } from './views/currentLocationView';
import { hideLoader, addLoader } from './views/loadView';

//Import images (from icons folder)
function importAll(r) {
  return r.keys().map(r); //run the function passed in
}
importAll(require.context('../img/icons/', false, /\.(png|jpe?g|svg)$/));
////////////////////////////////////////////////

async function init() {
  try {
    searchCitiesHandler(fetchFiveDayForecast);
    findLocation(getLocation);

    const { latitude, longitude } = await fetchLocationBasedOnIP();

    render(fetchFiveDayForecast, latitude, longitude, true);
    hideLoader();
  } catch (err) {
    //incase an error happends with fetchLocationBasedOnIP() hide the loader
    hideLoader();
  }
}

init();

// const date = new Date();
// console.log(new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(date));

//render weather based on user's ip address

// render(fetchFiveDayForecast, 49.8954221, -97.1385145, true);
