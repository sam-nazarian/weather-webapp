// Import Files
import { render } from './renderView.js';
import { hideLoader, addLoader } from './loadView';

// Import DOM
const locationButton = document.querySelector('.location-button');
const errMessageDom = document.querySelector('.err-message');
const errContainerDom = document.querySelector('.err-container');
const yearDom = document.querySelector('.year');

// Global variable
let errTimeout = 0;

/**
 * adds click handler attached to find location button that enables rendering weather based on user's geolocation data
 * @param {Function} getLocation function in Model that renders weather based on user's geolocation data that's gathered from the geolocation API
 */
export function findLocation(getLocation) {
  locationButton.addEventListener('click', () => {
    if (locationButton.classList.contains('location-button-active')) return;
    getLocation(showError, render, hideLoader);
    addLoader();
  });
}

/**
 * Display err using err-container popup at the top of the page
 * @param {String} text the text that will show on the error popup
 */
function showError(text) {
  if (errTimeout > 0) clearTimeout(errTimeout); //remove timer if it was already set below (which would have a val>0)
  errMessageDom.innerHTML = text;
  errContainerDom.classList.add('err-container-active');

  errTimeout = window.setTimeout(() => {
    errContainerDom.classList.remove('err-container-active');
  }, 1400);
}

/**
 * Set current year on copyright paragraph
 */
export function updateCopyrightDate() {
  console.log('hello');
  yearDom.textContent = new Date().getFullYear();
}
