import { Button } from './Button.js';
import { Input } from './Input.js';

export function SearchForm() {
  function handleFormSubmission(event) {
    event.preventDefault();

    const searchValid = searchTermInput.validate();
    const locationValid = locationInput.validate();

    if (!searchValid || !locationValid) {
      return;
    }
  }

  const form = document.createElement('form');

  const searchTermInput = new Input({
    labelText: 'Search term',
    type: 'text',
    placeholder: 'eg. Tacos',
    name: 'search-term',
    validator: (value) => value != undefined && value.length > 0,
  });

  const locationInput = new Input({
    labelText: 'Location',
    type: 'text',
    placeholder: 'San Francisco',
    name: 'location',
    validator: (value) => value != undefined && value.length > 0,
  });

  const btn = Button({
    text: 'Search',
    type: 'submit',
    onClick: function () {},
  });

  form.append(searchTermInput.container, locationInput.container, btn);
  form.addEventListener('submit', handleFormSubmission);

  return form;
}
