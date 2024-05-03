import { IMAGE_NOT_FOUND_PATH, ROUTES } from '../common/constants.js';
import { $ } from '../common/dom.js';
import { getRouter } from '../router.js';
export function BusinessCard(props) {
    const { id, imageUrl, reviewsCount, name = 'Business name not available', address = 'Address not available', phone = 'Phone not available', } = props;
    const router = getRouter();
    const componentContainer = $.createElement('div');
    const renderedOnHomePage = !!window.location.search;
    const businessDetailPath = `${ROUTES.detail}/${id}`;
    const markup = `
    <article class=" ${renderedOnHomePage ? 'business-card' : 'business-card__detail'}">
      <a href="${businessDetailPath}">
        <img src="${imageUrl}" alt="${name !== null && name !== void 0 ? name : 'unknown'} business" />
        <h3>${name}</h3>
        <div>
          <div>
            <p class="business-card__address">
              <i class="ph-duotone ph-map-pin-simple-area"></i>
              ${address}
            </p>
          </div>
          <div>
            <p>
              <i class="ph-duotone ph-calendar-star"></i>
              ${reviewsCount ? `${reviewsCount} reviews` : 'Review count not available'}
            </p>
            <p>
              <i class="ph-duotone ph-phone"></i>
              ${phone}
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
        businessImg === null || businessImg === void 0 ? void 0 : businessImg.addEventListener('error', function setDefaultImage() {
            this.src = IMAGE_NOT_FOUND_PATH;
        });
        const aTag = componentContainer.querySelector('a');
        aTag === null || aTag === void 0 ? void 0 : aTag.addEventListener('click', function (event) {
            if (!renderedOnHomePage) {
                event.preventDefault();
                return;
            }
            router.preventATagFromDefault(event, businessDetailPath);
        });
    }
    initComponent();
    return { getContainer };
}
