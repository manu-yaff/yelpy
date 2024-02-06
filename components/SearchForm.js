import { getBusinessBySearch } from '../external/api.js';
import { isNotEmpty } from '../js/helpers/validators.js';
import { Button } from './Button.js';
import { Input } from './Input.js';

export function SearchForm(onSubmission) {
  this.container = document.createElement('form');
  this.onSubmission = onSubmission;

  this.searchInput = new Input({
    labelText: 'Search term',
    type: 'text',
    placeholder: 'eg. Tacos',
    name: 'search-term',
    validator: isNotEmpty,
  });

  this.locationInput = new Input({
    labelText: 'Location',
    type: 'text',
    placeholder: 'San Francisco',
    name: 'location',
    validator: isNotEmpty,
  });

  this.submitButton = new Button({
    text: 'Search',
    type: 'submit',
  });

  this.render();
}

SearchForm.prototype.render = function () {
  this.container.append(this.searchInput.container);
  this.container.append(this.locationInput.container);
  this.container.append(this.submitButton.container);
  this.container.addEventListener('submit', this.handleFormSubmission.bind(this));
};

SearchForm.prototype.handleFormSubmission = async function (event) {
  event.preventDefault();

  const searchValid = this.searchInput.validate();
  const locationValid = this.locationInput.validate();

  if (!searchValid || !locationValid) {
    return;
  }

  const result = await getBusinessBySearch(this.searchInput.value, this.locationInput.value);
  this.onSubmission('data', result);
};
