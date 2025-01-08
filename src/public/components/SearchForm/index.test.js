import { CONSTANTS } from '../constants';
import { SearchForm } from './index';

describe(SearchForm.name, () => {
  it('should have search term input', () => {
    // Arrange

    // Act
    const form = new SearchForm({
      onFormSubmitted: () => {},
    });

    const searchInput = form.container.querySelector(
      `input[name=${CONSTANTS.form.searchTerm}]`
    );

    // Assert
    expect(searchInput).toBeInstanceOf(HTMLInputElement);
  });

  it('should have location input', () => {
    // Arrange

    // Act
    const form = new SearchForm({
      onFormSubmitted: () => {},
    });

    const locationInput = form.container.querySelector(
      `input[name=${CONSTANTS.form.location}]`
    );

    // Assert
    expect(locationInput).toBeInstanceOf(HTMLInputElement);
  });

  it('should call the given callback on successfully form submission', () => {
    // Arrange
    const onFormSubmittedMock = jest.fn();

    const form = new SearchForm({
      onFormSubmitted: onFormSubmittedMock,
    });

    const searchInput = form.container.querySelector(
      `input[name=${CONSTANTS.form.location}]`
    );

    const locationInput = form.container.querySelector(
      `input[name=${CONSTANTS.form.location}]`
    );

    searchInput.value = 'tacos';
    locationInput.value = 'san francisco';

    // Act
    form.container.submit();

    // Assert
    expect(onFormSubmittedMock).toHaveBeenCalled();
  });

  // Note: having `required` in the input elements does not avoid form submission
  // when the event if fired programmatically with form.submit()

  it.skip('should not submit form when search input is empty', () => {
    // Arrange
    const onFormSubmittedMock = jest.fn();
    const form = new SearchForm({
      onFormSubmitted: onFormSubmittedMock,
    });

    const searchInput = form.container.querySelector(
      `input[name=${CONSTANTS.form.searchTerm}]`
    );

    searchInput.value = '';

    console.log(searchInput.required);

    // Act
    form.container.submit();

    // Assert
    expect(onFormSubmittedMock).not.toHaveBeenCalled();
  });

  it.skip('should not submit form when location input is empty', () => {
    // Arrange
    const onFormSubmittedMock = jest.fn();

    // Act
    const form = new SearchForm({
      onFormSubmitted: onFormSubmittedMock,
    });

    const searchInput = form.container.querySelector(
      `input[name=${CONSTANTS.form.location}]`
    );

    searchInput.value = 'san francisco';

    // Assert
    expect(onFormSubmittedMock).not.toHaveBeenCalled();
  });
});
