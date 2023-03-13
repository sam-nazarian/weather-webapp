// Import DOM
// Error messages
const errMessageDom = document.querySelector('.err-message');
const errContainerDom = document.querySelector('.err-container');
// Loaders
const loadingImgDom = document.querySelector('.loading-img');
const containerDom = document.querySelector('.container');
const loadedBodyDom = document.querySelector('.loaded-body');
const preloaderDom = document.querySelector('.preloader');

// Global variable
let errTimeout = 0;

/**
 * Display err using err-container popup at the top of the page
 * @param {String} text the text that will show on the error popup
 * @param {Boolean} isErr make the error/message container's background red if it's an error, make it blue if it's not an error
 */
export function showError(text, isErr = true) {
  if (errTimeout > 0) clearTimeout(errTimeout); //remove timer if it was already set below (which would have a val>0)
  errMessageDom.innerHTML = text;
  errContainerDom.classList.add('err-container-active');

  if (isErr) errContainerDom.classList.add('err-container--red'); //make it red if it's error
  if (!isErr) errContainerDom.classList.add('err-container--blue'); //make it blue if it's not an error

  errTimeout = window.setTimeout(() => {
    errContainerDom.classList.remove('err-container-active');

    if (isErr) errContainerDom.classList.remove('err-container--red');
    if (!isErr) errContainerDom.classList.remove('err-container--blue');
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

/*
  Hide preloader when the website loads
 */
window.addEventListener('load', function () {
  loadedBodyDom.style.display = '';
  preloaderDom.style.display = 'none';
});
