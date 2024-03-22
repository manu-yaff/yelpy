import { Review } from './Review.js';

export function ReviewList(reviews) {
  function render(container) {
    if (reviews.length == 0) {
      container.innerHTML = 'No reviews were found';
      return container;
    }

    const listContainer = document.createElement('div');

    reviews.forEach((review) => {
      const reviewMarkup = Review(review).getMarkup();
      listContainer.insertAdjacentHTML('beforeend', reviewMarkup);
    });

    container.innerHTML = ''; // TODO: check to see if replaceChildren can be used
    container.appendChild(listContainer);

    return container;
  }

  return {
    render: render,
  };
}
