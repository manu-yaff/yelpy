export class SearchPage {
  #componentContainer = document.createElement('section');

  #markup = `
    <h1>This is the search page</h1>
  `;

  constructor() {
    this.#init();
  }

  getContainer() {
    return this.#componentContainer;
  }

  #init() {
    this.#componentContainer.insertAdjacentHTML('beforeend', this.#markup);
  }
}
