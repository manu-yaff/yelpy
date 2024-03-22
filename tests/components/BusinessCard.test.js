import { getByText, getByAltText } from '@testing-library/dom';
import { BusinessCard } from '../../components/BusinessCard';

describe('BusinessCard', () => {
  describe('render', () => {
    it('should render business card component', () => {
      const businessCardProps = {
        imageUrl: 'www.google.com',
        name: 'Tacos San Pancho',
        address: 'San Francisco',
        phone: '1234567890',
        reviews: '10 reviews',
      };

      const businessCard = BusinessCard(businessCardProps);

      const container = document.createElement('div');
      container.insertAdjacentHTML('beforeend', businessCard.getMarkup());

      const businessImage = getByAltText(container, `${businessCardProps.name} business image`);

      expect(businessImage.src).toContain(businessCardProps.imageUrl);
      getByText(container, businessCardProps.name);
      getByText(container, businessCardProps.address);
      getByText(container, businessCardProps.phone);
      getByText(container, businessCardProps.reviews);

      // TODO: how to check image on load error is render?
    });
  });
});
