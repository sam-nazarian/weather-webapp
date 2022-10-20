const loadingImgDom = document.querySelector('.loading-img');
const containerDom = document.querySelector('.container');

export function hideLoader() {
  loadingImgDom.classList.add('hide');
  containerDom.classList.remove('loading-background');
}

export function addLoader() {
  loadingImgDom.classList.remove('hide');
  containerDom.classList.add('loading-background');
}
