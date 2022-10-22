// Import DOM
const loadingImgDom = document.querySelector('.loading-img');
const containerDom = document.querySelector('.container');

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
