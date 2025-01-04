export class BusinessPage {
  #componentContainer = document.createElement('section');

  #markup = `
    <h1>This is the business page</h1>
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
