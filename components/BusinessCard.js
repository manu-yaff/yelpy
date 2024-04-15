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
export function BusinessCard({ id, imageUrl, name, address, phone, reviewsCount }) {
  const componentContainer = document.createElement('div');
  const renderOnHomePage = !!window.location.search;
  const businessDetailPath = `${ROUTES.detail}/${id}`;
  const markup = `
    <article class=" ${renderOnHomePage ? 'business-card' : 'business-card__detail'}">
      <a href="${businessDetailPath}">
        <img src="${imageUrl}" alt="${name ?? 'unknown'} business" />
        <h3>${name ?? 'Name not available'}</h3>
        <div>
          <div>
            <p class="business-card__address">
              <i class="ph-duotone ph-map-pin-simple-area"></i>
              ${address ?? 'Address not available'}
            </p>
          </div>
          <div>
            <p>
              <i class="ph-duotone ph-calendar-star"></i>
              ${reviewsCount ? `${reviewsCount} reviews` : 'Review count not available'}
            </p>
            <p>
              <i class="ph-duotone ph-phone"></i>
              ${phone ? phone : 'Phone not available'}
            </p>
          </div>
        </div>
      </a>
    </article>
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
