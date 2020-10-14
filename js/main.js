import galleryItems from './gallery-items.js';

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  cardsMarkup: createGalleryCardsMarkup(galleryItems),
  modal: document.querySelector('.js-lightbox'),
  bigImg: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

refs.galleryContainer.insertAdjacentHTML('beforeend', refs.cardsMarkup);
refs.galleryContainer.addEventListener('click', onGalleryContainerClick);

//Разметка галереи
function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}
//Делегирование
function onGalleryContainerClick(evt) {
  evt.preventDefault();

  if (evt.target === evt.currentTarget) {
    return;
  }

  addActiveModalClass();

  openImage(evt);

  window.addEventListener('keydown', KeyPress);
  refs.closeModalBtn.addEventListener('click', closeModal);
}

function addActiveModalClass() {
  refs.modal.classList.add('is-open');
  console.log('modal');
}

function openImage(evt) {
  refs.bigImg.src = evt.target.dataset.source;
  refs.bigImg.alt = evt.target.alt;
  console.log('openImage');
}

function KeyPress(evt) {
  if (evt.code !== 'Escape') {
    return;
  }

  console.log('handleKeyPress');
  closeModal();
}

function closeModal() {
  refs.modal.classList.remove('is-open');
  refs.bigImg.src = '';
  refs.bigImg.alt = '';
  window.removeEventListener('keydown', KeyPress);
  refs.closeModalBtn.removeEventListener('click', closeModal);

  console.log('closeModal');
}
