// Import DOM
// Error messages
const errMessageDom = document.querySelector('.err-message');
const errContainerDom = document.querySelector('.err-container');
// Loaders
const loadingImgDom = document.querySelector('.loading-img');
const containerDom = document.querySelector('.container');

// Global variable
let errTimeout = 0;

/**
 * Display err using err-container popup at the top of the page
 * @param {String} text the text that will show on the error popup
 */
export function showError(text) {
  if (errTimeout > 0) clearTimeout(errTimeout); //remove timer if it was already set below (which would have a val>0)
  errMessageDom.innerHTML = text;
  errContainerDom.classList.add('err-container-active');

  errTimeout = window.setTimeout(() => {
    errContainerDom.classList.remove('err-container-active');
  }, 2000);
}

/**
 * Hides the loader & the blury screen, indicating that the loading finished
 */
export function hideLoader() {
  loadingImgDom.classList.add('hide');
  containerDom.classList.remove('loading-background');
}

/**
 * Adds a loader & the blury screen, indicating that the website is loading
 */
export function addLoader() {
  loadingImgDom.classList.remove('hide');
  containerDom.classList.add('loading-background');
}
