import { BusinessHours } from '../../components/BusinessHours.js';
import { getByText, getAll } from '@testing-library/dom';

describe('BusinessHours', () => {
  describe('render', () => {
    it('should render correctly', () => {
      const businessHoursProps = {
        isOpen: true,
        dayHours: [
          { weekday: 'Monday', hours: ['9:00am - 2:00pm', '4:00pm - 6:00pm'] },
          { weekday: 'Tuesday', hours: ['8:00am - 2:00pm', '4:00pm - 6:30pm'] },
          { weekday: 'Friday', hours: ['9:30am - 2:00pm', '4:00pm - 7:00pm'] },
        ],
      };

      const businessHours = BusinessHours(businessHoursProps);
      const container = document.createElement('div');
      container.insertAdjacentHTML('beforeend', businessHours.getMarkup());

      getByText(container, 'Open');

      businessHoursProps.dayHours.forEach((hour) => {
        getByText(container, hour.weekday);
        getByText(container, hour.hours[0]);
        getByText(container, hour.hours[1]);
      });
    });
  });
});
