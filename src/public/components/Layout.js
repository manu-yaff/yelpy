export class Layout {
  #componentContainer;

  #markup = `<h1>Layout component</h1>`;

  constructor() {
    this.#init();
  }

  getContainer() {
    return this.#componentContainer;
  }

  #init() {
    this.#addMarkupToContainer();
  }

  #addMarkupToContainer() {
    const tempContainer = document.createElement('div');

    tempContainer.insertAdjacentHTML('beforeend', this.#markup);

    this.#componentContainer = tempContainer.firstElementChild;
  }
}
