import { Review } from './Review.js';

export function ReviewList(reviews) {
  function getMarkup() {
    if (reviews.length == 0) return '<p>No reviews were found</p>';

    return `
      <div>
        <p>Reviews</p>
        ${reviews.map((review) => Review(review).getMarkup()).join('')}
      </div>
    `;
  }

  return {
    getMarkup,
  };
}
