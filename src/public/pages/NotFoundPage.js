export class NotFoundPage {
  #componentContainer = document.createElement('section');

  #markup = `
    <h1>404: not found!</h1>
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
