// Import Files
import { render } from './renderView.js';
import { hideLoader, addLoader, showError } from './loadView.js';

// Import DOM
const locationButton = document.querySelector('.location-button');
const yearDom = document.querySelector('.year');

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
 * Set current year on copyright paragraph
 */
export function updateCopyrightDate() {
  yearDom.textContent = new Date().getFullYear();
}
