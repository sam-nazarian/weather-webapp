// Import Styles
import generalStyle from '../css/general.css';
import mainStyle from '../css/main.css';
import queriesStyle from '../css/queries.css';

//Import images (from icons folder)
function importAll(r) {
  return r.keys().map(r); //run the function passed in
}
importAll(require.context('../img/icons/', false, /\.(png|jpe?g|svg)$/));
importAll(require.context('../img/favicon/', false, /\.(png|jpe?g|svg)$/));

// Import Files
import { fetchFiveDayForecast, fetchLocationBasedOnIP, getLocation } from './model.js';
import { render } from './views/renderView.js';
import { searchCitiesHandler } from './views/searchView.js';
import { findLocation, updateCopyrightDate } from './views/currentLocationView';
import { hideLoader } from './views/loadView';

////////////////////////////////////////////////

/**
 * Enables being able to use the search bar & findLocation button.
 *
 * Additionaly gets the user's weather based on the approxiate location of the user,
 * based on the IP address of the user without required permission
 */
async function init() {
  try {
    searchCitiesHandler(fetchFiveDayForecast);
    findLocation(getLocation);
    updateCopyrightDate();

    const { latitude, longitude } = await fetchLocationBasedOnIP();
    render(fetchFiveDayForecast, latitude, longitude, false);
  } catch (err) {
    //incase an error happends with fetchLocationBasedOnIP() hide the loader
    hideLoader();
  }
}

init();
