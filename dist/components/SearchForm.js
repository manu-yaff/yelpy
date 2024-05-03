import { $ } from '../common/dom.js';
import { Button } from './Button.js';
import { Input } from './Input.js';
export function SearchForm({ searchTerm, location, onFormSubmitted }) {
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
        onClick: () => { },
    });
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
    function initComponent() {
        componentContainer.append(searchInput.getContainer(), locationInput.getContainer(), submitButton.getContainer());
        componentContainer.setAttribute('name', SEARCH_FORM_NAME);
        componentContainer.addEventListener('submit', handleFormSubmission);
    }
    initComponent();
    return { getContainer };
}
