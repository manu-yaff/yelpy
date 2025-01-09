import { Input } from '../Input/index.js';
import { Button } from '../Button/index.js';
import { CONSTANTS } from '../constants.js';

export class SearchForm {
  #componentContainer;

  #onFormSubmitted;

  /**
   * @param{Object} props
   * @param{Function} props.onFormSubmitted The callback to be called when form is
   * submitted
   */
  constructor({ onFormSubmitted }) {
    this.#onFormSubmitted = onFormSubmitted;

    this.#init();
  }

  /**
   * Gets the component container
   * @returns {HTMLFormElement} The component container
   */
  get container() {
    return this.#componentContainer;
  }

  /**
   * Binds component properties to the markup
   * @returns {string} The markup with the propertied bind to it
   */
  #markup() {
    return `
      <form>
      </form>
    `;
  }

  /**
   * Helper function to add the markup to a container and retrieve the markup
   * as an document element
   */
  #addMarkupToContainer() {
    const tempContainer = document.createElement('div');

    tempContainer.insertAdjacentHTML('beforeend', this.#markup());

    this.#componentContainer = tempContainer.firstElementChild;
  }

  /**
   * @param {SubmitEvent} submitEvent Form submission event object
   */
  #handleFormSubmission(submitEvent) {
    submitEvent.preventDefault();

    const formData = new FormData(submitEvent.target);

    formData.get(CONSTANTS.form.searchTerm);
    formData.get(CONSTANTS.form.location);

    // TODO: here call the given function with the given arguments
    this.#onFormSubmitted();
  }

  /**
   * Initializes the component
   */
  #init() {
    const searchTermInput = new Input({
      labelText: 'Search term',
      type: 'text',
      placeholder: 'eg. Tacos',
      name: CONSTANTS.form.searchTerm,
      required: true,
      value: undefined, // TODO: pass the actual value
    });

    const locationInput = new Input({
      labelText: 'Location',
      type: 'text',
      placeholder: 'San Francisco',
      name: CONSTANTS.form.location,
      required: true,
      value: undefined, // TODO: pass the actual value
    });

    const submitButton = new Button({
      text: 'Search',
      type: 'submit',
      onClick: () => {},
    });

    this.#addMarkupToContainer();

    this.container.append(
      searchTermInput.container,
      locationInput.container,
      submitButton.container
    );

    this.container.addEventListener(
      'submit',
      this.#handleFormSubmission.bind(this)
    );
  }
}
