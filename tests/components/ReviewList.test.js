import { ReviewList } from '../../components/ReviewList.js';
import { getByText, getAllByTestId } from '@testing-library/dom';
import { businessDetailResponse } from '../mocks/businessDetailResponse.js';

describe('ReviewList', () => {
  describe('render', () => {
    it('should show messages when there is no reviews', () => {
      const reviewList = ReviewList([]);
      const noReviewsMessage = 'No reviews were found';
      const container = document.createElement('div');

      getByText(reviewList.render(container), noReviewsMessage);
    });

    it('should show reviews list', () => {
      const container = document.createElement('div');
      const reviewList = ReviewList(businessDetailResponse.reviews);
      reviewList.render(container);

      const reviews = getAllByTestId(container, 'review-item');

      expect(reviews).toHaveLength(3);
    });
  });
});
