import { Button } from './Button.js';
import { Input } from './Input.js';

export function SearchForm({ onFormSubmitted }) {
  const SEARCH_FORM_NAME = 'search-form';
  const componentContainer = document.createElement('form');
  const searchInput = Input({
    labelText: 'Search term',
    type: 'text',
    placeholder: 'eg. Tacos',
    name: 'search-term',
    required: true,
  });

  const locationInput = Input({
    labelText: 'Location',
    type: 'text',
    placeholder: 'San Francisco',
    name: 'location',
    required: true,
  });

  const submitButton = Button({
    text: 'Search',
    type: 'submit',
    onClick: () => {},
  });

  initComponent();

  function initComponent() {
    componentContainer.append(
      searchInput.getContainer(),
      locationInput.getContainer(),
      submitButton.getContainer()
    );

    componentContainer.setAttribute('name', SEARCH_FORM_NAME);
    componentContainer.addEventListener('submit', handleFormSubmission);
  }

  function handleFormSubmission(event) {
    event.preventDefault();

    const formData = new FormData(this);

    onFormSubmitted({
      searchTerm: formData.get('search-term'),
      location: formData.get('location'),
    });
  }

  function getContainer() {
    return componentContainer;
  }

  return { getContainer };
}
