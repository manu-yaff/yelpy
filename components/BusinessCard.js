import { IMAGE_NOT_FOUND_PATH, ROUTES } from '../constants.js';

export function BusinessCard({ id, imageUrl, name, address, phone, reviews }) {
  const componentContainer = document.createElement('div');
  const businessDetailPath = `${ROUTES.detail}/${id}`;
  const markup = `
    <div>
      <a href="${businessDetailPath}">
        <img src="${imageUrl}" alt="${name} business image" />
        <p>${name}</p>
        <div>
          <p>${address}</p>
          <div>
            <p>${reviews}</p>
            <p>${phone}</p>
          </div>
        </div>
      </a>
    </div>
  `;

  initComponent();

  function addEventListeners() {
    const businessImg = componentContainer.querySelector('img');
    businessImg.addEventListener('error', function handleImageLoadError() {
      businessImg.src = IMAGE_NOT_FOUND_PATH;
    });

    const aTag = componentContainer.querySelector('a');
    aTag.addEventListener('click', (event) => {
      window.router.preventATagFromDefault(event, businessDetailPath);
    });
  }

  function initComponent() {
    componentContainer.insertAdjacentHTML('beforeend', markup);

    addEventListeners();
  }

  function getMarkup() {
    return markup;
  }

  function getContainer() {
    return componentContainer;
  }

  return { getMarkup, getContainer };
}
