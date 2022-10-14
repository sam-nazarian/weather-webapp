import generalStyle from '../css/general.css';
import mainStyle from '../css/main.css';

//imoprt all images from the chesspieces folder
function importAll(r) {
  return r.keys().map(r); //run the function passed in
}

const x = importAll(require.context('../img/icons/', false, /\.(png|jpe?g|svg)$/));
