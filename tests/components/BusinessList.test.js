import { getByText, getByAltText } from '@testing-library/dom';
import { BusinessList } from '../../components/BusinessList.js';

describe('BusinessList', () => {
  describe('render', () => {
    it('should render empty state message when there are no businesses', () => {
      const businessData = [];
      const noResultsMessage = 'No results were found for your search';

      const businessList = new BusinessList(document.createElement('div'), businessData);

      businessList.render();

      getByText(businessList.container, noResultsMessage);
    });

    it('should have list of business components', () => {
      const businessData = [
        {
          image: 'www.google.com',
          name: 'business 1',
          address: 'address 1',
          phone: 'phone 1',
          reviewsCount: '1 reviews',
        },
        {
          image: 'www.google.com',
          name: 'business 2',
          address: 'address 2',
          phone: 'phone 2',
          reviewsCount: '2 reviews',
        },
      ];

      const businessList = new BusinessList(document.createElement('div'), businessData);

      businessList.render();

      businessList.items.forEach((business, index) => {
        expect(business.image).toBe(businessData[index].image);
        expect(business.name).toBe(businessData[index].name);
        expect(business.address).toBe(businessData[index].address);
        expect(business.phone).toBe(businessData[index].phone);
        expect(business.reviewsCount).toBe(businessData[index].reviewsCount);
      });
    });
  });
});
