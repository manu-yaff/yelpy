import { Review } from './Review.js';

export function ReviewList({ items }) {
  const componentContainer = document.createElement('div');

  const markup = `
    <div>
      <p>Reviews</p>
      <div id="reviews-container"></div>
    </div>
  `;

  initComponent();

  function initComponent() {
    if (items.length == 0) {
      componentContainer.insertAdjacentHTML('beforeend', '<p>No reviews were found</p>');
      return;
    }

    componentContainer.insertAdjacentHTML('beforeend', markup);

    const reviewsContainer = componentContainer.querySelector('#reviews-container');

    items.forEach((item) => {
      const reviewComp = Review(item);

      reviewsContainer.appendChild(reviewComp.getContainer());
    });
  }

  function getContainer() {
    return componentContainer;
  }

  return {
    getContainer,
  };
}
