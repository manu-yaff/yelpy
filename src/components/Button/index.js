export class Button {
  #componentContainer;

  #markup = `<button></button>`;

  #type;
  #text;
  #onClick;

  /**
   * Initializes the button component
   * @param {Object} props The button properties
   * @param {string} props.text The button text
   * @param {string} props.type Indicates the button type, eg. button, submit, etc
   * @param {string} props.onClick callback to call when the button is clicked
   */
  constructor({ text, onClick, type = 'button' }) {
    this.#text = text;
    this.#onClick = onClick;
    this.#setType(type);

    this.#init();
  }

  #setType(type) {
    const validButtonTypes = ['button', 'submit'];

    if (!validButtonTypes.includes(type)) {
      throw new Error(
        `Invalid button type, valid types are: ${validButtonTypes}`
      );
    }

    this.#type = type;
  }

  get container() {
    return this.#componentContainer;
  }

  #init() {
    this.#addMarkupToContainer();
    this.#setButtonAttributes();
  }

  #addMarkupToContainer() {
    const tempContainer = document.createElement('div');

    tempContainer.insertAdjacentHTML('beforeend', this.#markup);

    this.#componentContainer = tempContainer.firstElementChild;
  }

  #setButtonAttributes() {
    this.#componentContainer.setAttribute('type', this.#type);
    this.#componentContainer.textContent = this.#text;
    this.#componentContainer.addEventListener('click', this.#onClick);
  }
}
