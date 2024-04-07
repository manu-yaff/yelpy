import { Review } from './Review.js';

/**
 *
 * @param {Object} props
 * @example props {
 *  items: Array<{@link Review}>
 * }
 */
export function ReviewList({ items }) {
  const componentContainer = document.createElement('div');
  const reviewsContainerId = 'reviews-container';

  const markup = `
    <div>
      <p>Reviews</p>
      <div id="${reviewsContainerId}"></div>
    </div>
  `;

  function getContainer() {
    return componentContainer;
  }

  function initComponent() {
    if (items.length == 0) {
      componentContainer.insertAdjacentHTML('beforeend', '<p>No reviews were found</p>');
      return;
    }

    componentContainer.insertAdjacentHTML('beforeend', markup);

    const reviewsContainer = componentContainer.querySelector(`#${reviewsContainerId}`);

    items.forEach((item) => {
      const reviewComp = Review(item);

      reviewsContainer.appendChild(reviewComp.getContainer());
    });
  }

  initComponent();

  return {
    getContainer,
  };
}
