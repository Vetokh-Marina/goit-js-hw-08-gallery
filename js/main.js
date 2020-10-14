import galleryItems from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const cardsMarkup = createGalleryCardsMarkup(galleryItems);
const modalWindow = document.querySelector('.js-lightbox');
const bigPicture = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);

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

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  if (evt.target === evt.currentTarget) {
    return;
  }

  addActiveModalClass();

  openImage(evt);

  window.addEventListener('keydown', handleKeyPress);
  closeModalBtn.addEventListener('click', closeModal);
}

function addActiveModalClass() {
  modalWindow.classList.add('is-open');
  console.log('modalWindow');
}

function openImage(evt) {
  bigPicture.src = evt.target.dataset.source;
  bigPicture.alt = evt.target.alt;
  console.log('openImage');
}

function handleKeyPress(evt) {
  if (evt.code !== 'Escape') {
    return;
  }

  console.log('handleKeyPress');
  closeModal();
}

function closeModal() {
  modalWindow.classList.remove('is-open');
  bigPicture.src = '';
  bigPicture.alt = '';
  window.removeEventListener('keydown', handleKeyPress);
  closeModalBtn.removeEventListener('click', closeModal);

  console.log('closeModal');
}
