import { SearchForm } from '../../components/SearchForm.js';
import { fireEvent, getByPlaceholderText, getByText } from '@testing-library/dom';

describe('SearchForm', () => {
  describe('render', () => {
    it('should render form elements correctly', () => {
      const onSubmitFunction = function () {};
      const form = new SearchForm(document.createElement('div'), onSubmitFunction);

      form.render();

      getByPlaceholderText(form.container, 'eg. Tacos');
      getByPlaceholderText(form.container, 'San Francisco');
      getByText(form.container, 'Search');
    });
  });

  describe('interactions', () => {
    it('should not submit form if one input is empty', () => {
      const onSubmitFunction = jest.fn();
      const form = new SearchForm(document.createElement('div'), onSubmitFunction);

      form.render();

      const submitButton = getByText(form.container, 'Search');

      fireEvent.click(submitButton);

      expect(onSubmitFunction).not.toHaveBeenCalled();
    });

    it('should submit form correctly when both inputs are valid', () => {
      const onSubmitFunction = jest.fn();
      const form = new SearchForm(document.createElement('div'), onSubmitFunction);

      form.render();

      const submitButton = getByText(form.container, 'Search');
      const searchInput = getByPlaceholderText(form.container, 'eg. Tacos');
      const locationInput = getByPlaceholderText(form.container, 'San Francisco');

      fireEvent.input(searchInput, { target: { value: 'tacos' } });
      fireEvent.input(locationInput, { target: { value: 'san francisco' } });

      fireEvent.submit(submitButton);

      expect(onSubmitFunction).toHaveBeenCalled();
    });

    // TODO: add test to check if we entered the previous search we don't send search again, optimization
  });
});
