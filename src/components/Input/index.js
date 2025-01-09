export class Input {
  #componentContainer;

  #type;
  #labelText;
  #placeholder;
  #name;
  #required;
  #value;

  /**
   * @param {Object} props The input properties
   * @param {string} props.type The input's type
   * @param {string} props.labelText The input's text label
   * @param {string} props.placeholder The input's placeholder
   * @param {string} props.name The input's name // TODO: add here what is used for
   * @param {string} props.required Indicates whether the input must be filled before form submission
   * @param {string} props.value The input value
   */
  constructor({ type, labelText, placeholder, name, required, value }) {
    this.#type = type;
    this.#labelText = labelText;
    this.#placeholder = placeholder;
    this.#name = name;
    this.#required = required;
    this.#value = value;

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
      <div>
        <label for="${this.#name}">${this.#labelText}</label>
        <input
            type="${this.#type}"
            placeholder="${this.#placeholder}"
            name="${this.#name}"
            ${this.#required ? 'required' : ''}
            ${this.#value ? `value="${this.#value}"` : ''}
        />
      </div>
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
