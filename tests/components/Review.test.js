import { getByText, getByAltText, getAllByTestId } from '@testing-library/dom';
import { Review } from '../../components/Review.js';

describe('Review', () => {
  describe('render', () => {
    it('should render review component correctly', () => {
      const container = document.createElement('div');
      const reviewProps = {
        rating: 5,
        timeCreated: '2024-01-01',
        text: 'five start restaurant',
        user: {
          name: 'Jonh Doe',
          profileUrl: 'www.google.com/picture',
        },
      };
      const review = Review(reviewProps);

      const userPic = getByAltText(review.render(container), `${reviewProps.user.name} profile`);
      const ratingStarts = getAllByTestId(review.render(container), 'review-star-icon');

      getByText(review.render(container), reviewProps.user.name);
      getByText(review.render(container), reviewProps.timeCreated);
      getByText(review.render(container), reviewProps.text);

      expect(userPic.src).toContain(reviewProps.user.profileUrl);
      expect(ratingStarts).toHaveLength(reviewProps.rating);
    });
  });
});
