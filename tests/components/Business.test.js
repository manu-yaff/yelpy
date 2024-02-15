import { Business } from '../../components/Business.js';
import { getByText, getByAltText } from '@testing-library/dom';

describe('Business', () => {
  describe('render', () => {
    it('should render business component correctly', () => {
      const businessProps = {
        image: 'google.com',
        name: 'Tacos Orinoco',
        address: 'Epigmenio Gonzalez',
        phone: '1234567890',
        reviewsCount: '100 reviews',
      };

      const business = new Business(document.createElement('div'), businessProps);
      business.render();

      getByText(business.container, businessProps.name);
      getByText(business.container, businessProps.address);
      getByText(business.container, businessProps.phone);
      getByText(business.container, businessProps.reviewsCount);

      const image = getByAltText(business.container, `${businessProps.name} business`);

      expect(image.src).toBe(`http://localhost/${businessProps.image}`);
    });
  });
});
