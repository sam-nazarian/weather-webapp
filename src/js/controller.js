import generalStyle from '../css/general.css';
import mainStyle from '../css/main.css';
import { fetchFiveDayForecast, fetchCities } from './model.js';
import { render } from './views/renderView.js';
import searchView from './views/searchView.js';

//imoprt all images from the chesspieces folder
function importAll(r) {
  return r.keys().map(r); //run the function passed in
}
importAll(require.context('../img/icons/', false, /\.(png|jpe?g|svg)$/));

render(fetchFiveDayForecast, 49.8954221, -97.1385145, true);
