import { SearchForm } from '../SearchForm/index.js';

export class Layout {
  #componentContainer;

  constructor() {
    this.#init();
  }

  /**
   * Gets the component container
   * @returns {HTMLElement} The component container
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
      <section></section>
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
   * Initializes the component
   */
  #init() {
    this.#addMarkupToContainer();

    const searchForm = new SearchForm({
      onFormSubmitted: () => {
        // take the values from the form
        // add the values from the form to the search params
        // navigate to the new route
      },
    });

    this.container.append(searchForm.container);
  }
}
