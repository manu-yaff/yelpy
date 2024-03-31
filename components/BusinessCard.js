import { IMAGE_NOT_FOUND_PATH, ROUTES } from '../constants.js';

export function BusinessCard({ id, imageUrl, name, address, phone, reviews }) {
  const cardId = `business-card-${id}`;
  const markup = `
    <div id="${cardId}">
      <img src="${imageUrl}" alt="${name} business image" />
      <p>${name}</p>
      <div>
        <p>${address}</p>
        <div>
          <p>${reviews} reviews</p>
          <p>${phone}</p>
        </div>
      </div>
    </div>
  `;

  function getMarkup() {
    return markup;
  }

  function addEventListenersToCard() {
    const card = document.getElementById(cardId);
    const imageCard = document.querySelector(`#${cardId} > img`);
    card.addEventListener('click', function navigateToDetailView() {
      router.navigateTo(`${ROUTES.detail}${id}`);
    });

    imageCard.addEventListener('error', function setDefaultImage() {
      imageCard.src = IMAGE_NOT_FOUND_PATH;
    });
  }

  function render(container) {
    container.insertAdjacentHTML('beforeend', markup);
    addEventListenersToCard();
  }

  return { render, getMarkup };
}
