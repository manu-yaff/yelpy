import { ReviewEntity } from '../common/entities.js';
import { $ } from '../common/dom.js';
import { Review } from './Review.js';

interface ReviewListProps {
  items: Array<ReviewEntity>;
}

export function ReviewList({ items }: ReviewListProps) {
  const componentContainer = $.createElement('div');
  const reviewsContainerId = 'reviews-container';

  const markup = `
    <div>
      <h3>Reviews</h3>
      <div id="${reviewsContainerId}"></div>
    </div>
  `;

  function getContainer(): HTMLElement {
    return componentContainer;
  }

  function initComponent(): void {
    if (items.length === 0) {
      componentContainer.insertAdjacentHTML('beforeend', '<p>No reviews were found</p>');
      return;
    }

    componentContainer.insertAdjacentHTML('beforeend', markup);

    const reviewsContainer = componentContainer.querySelector(`#${reviewsContainerId}`);

    items.forEach((item: ReviewEntity) => {
      const reviewComp = Review(item);

      reviewsContainer?.appendChild(reviewComp.getContainer());
    });
  }

  initComponent();

  return {
    getContainer,
  };
}
