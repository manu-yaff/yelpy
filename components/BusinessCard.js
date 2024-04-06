import { IMAGE_NOT_FOUND_PATH, ROUTES } from '../constants.js';

/**
 * @param {Object} props
 * @example
 * props {
 *  id: 'Y2Iqqe13-n7_60q9ND0vMA'
 *  imageUrl: 'https://s3-media1.fl.yelpcdn.com/bphoto/EPQjzmlcf6bjSsFo3paTXg/o.jpg'
 *  name: 'Burgers Jonh'
 *  address: 'San Francisco'
 *  phone: '+524424034677'
 *  reviewCount: 87
 * }
 */
export function BusinessCard({ id, imageUrl, name, address, phone, reviewCount }) {
  const componentContainer = document.createElement('div');
  const renderOnHomePage = window.location.pathname == '/';
  const businessDetailPath = `${ROUTES.detail}/${id}`;
  const markup = `
    <div>
      <a href="${businessDetailPath}">
        <img src="${imageUrl}" alt="${name ?? 'unknown'} business" />
        <p>${name ?? 'Name not available'}</p>
        <div>
          <p>${address ?? 'Address not available'}</p>
          <div>
            <p>${reviewCount ? `${reviewCount} reviews` : 'Review count not available'}</p>
            <p>${phone ?? 'Phone not available'}</p>
          </div>
        </div>
      </a>
    </div>
  `;

  function initComponent() {
    componentContainer.insertAdjacentHTML('beforeend', markup);

    addEventListeners();
  }

  function getContainer() {
    return componentContainer;
  }

  function addEventListeners() {
    const businessImg = componentContainer.querySelector('img');
    businessImg.addEventListener('error', function handleImageLoadError() {
      businessImg.src = IMAGE_NOT_FOUND_PATH;
    });

    const aTag = componentContainer.querySelector('a');
    aTag.addEventListener('click', (event) => {
      if (!renderOnHomePage) {
        event.preventDefault();
        return;
      }

      window.router.preventATagFromDefault(event, businessDetailPath);
    });
  }

  initComponent();

  return { getContainer };
}
