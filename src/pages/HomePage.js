export class HomePage {
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
      <section>
        <p>Welcome!</p>
        <p>
          This app uses Yelp Fusion API, which allows you to ge the best local content
          and reviews from the millions of business around the world
        </p>
      </section>
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
  }
}
