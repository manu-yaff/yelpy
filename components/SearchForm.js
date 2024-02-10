import { isNotEmpty } from '../utils/validators.js';
import { Button } from './Button.js';
import { Input } from './Input.js';

export function SearchForm(parentNode, onFormSubmitted) {
  this.container = $create('form');
  this.parentNode = parentNode;

  this.onFormSubmitted = onFormSubmitted;

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
}

SearchForm.prototype.render = function () {
  this.container.append(this.searchInput.container);
  this.container.append(this.locationInput.container);
  this.container.append(this.submitButton.container);
  this.container.addEventListener('submit', this.handleFormSubmission.bind(this));
  this.parentNode.append(this.container);
};

SearchForm.prototype.handleFormSubmission = async function (event) {
  event.preventDefault();

  const searchValid = this.searchInput.validate();
  const locationValid = this.locationInput.validate();

  if (!searchValid || !locationValid) {
    return;
  }

  this.onFormSubmitted({ searchTerm: this.searchInput.value, location: this.locationInput.value });
};
