import { Button } from './Button.js';
import { Input } from './Input.js';

export function SearchForm() {
  function handleFormSubmission(event) {
    event.preventDefault();

    const formData = new FormData(form); // this has to be executed here to have the latest values

    for (const [key, value] of formData) {
      console.log(key);
      console.log(value);
    }
  }

  const form = document.createElement('form');

  const searchTermInput = Input({
    labelText: 'Search term',
    type: 'text',
    placeholder: 'eg. Tacos',
    name: 'search-term',
  });

  const locationInput = Input({
    labelText: 'Location',
    type: 'text',
    placeholder: 'San Francisco',
    name: 'location',
  });

  const btn = Button({
    text: 'Search',
    type: 'submit',
    onClick: function () {},
  });

  form.append(searchTermInput, locationInput, btn);
  form.addEventListener('submit', handleFormSubmission);

  return form;
}
