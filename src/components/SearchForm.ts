import { $ } from '../common/dom.js';
import { Button } from './Button.js';
import { Input } from './Input.js';

interface SearchFormProps {
  searchTerm: string;
  location: string;
  onFormSubmitted: (...arg: any[]) => void;
}

export function SearchForm({ searchTerm, location, onFormSubmitted }: SearchFormProps) {
  const SEARCH_FORM_NAME = 'search-form';
  const componentContainer = $.createElement('form');
  const searchInput = Input({
    labelText: 'Search term',
    type: 'text',
    placeholder: 'eg. Tacos',
    name: 'search-term',
    required: true,
    value: searchTerm,
  });

  const locationInput = Input({
    labelText: 'Location',
    type: 'text',
    placeholder: 'San Francisco',
    name: 'location',
    required: true,
    value: location,
  });

  const submitButton = Button({
    text: 'Search',
    type: 'submit',
    onClick: () => {},
  });

  function handleFormSubmission(this: HTMLFormElement, event: Event): void {
    event.preventDefault();

    const formData = new FormData(this);

    onFormSubmitted({
      searchTerm: formData.get('search-term'),
      location: formData.get('location'),
    });
  }

  function getContainer(): HTMLElement {
    return componentContainer;
  }

  function initComponent(): void {
    componentContainer.append(
      searchInput.getContainer(),
      locationInput.getContainer(),
      submitButton.getContainer()
    );

    componentContainer.setAttribute('name', SEARCH_FORM_NAME);
    componentContainer.addEventListener('submit', handleFormSubmission);
  }

  initComponent();

  return { getContainer };
}
