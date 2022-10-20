const locationButton = document.querySelector('.location-button');
const errMessageDom = document.querySelector('.err-message');
const errContainerDom = document.querySelector('.err-container');
import { render } from './renderView.js';

let errTimeout = 0;

export function findLocation(getLocation) {
  locationButton.addEventListener('click', () => {
    getLocation(showError, render);
  });
}

/**
 * Display err using err-container popup at the top of the page
 * @param {String} text
 */
function showError(text) {
  if (errTimeout > 0) clearTimeout(errTimeout); //remove timer if it was already set below (which would have a val>0)
  errMessageDom.innerHTML = text;
  errContainerDom.classList.add('err-container-active');

  errTimeout = window.setTimeout(() => {
    errContainerDom.classList.remove('err-container-active');
  }, 1400);
}
