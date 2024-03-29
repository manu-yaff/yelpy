import { BaseComponent } from '../components/BaseElement.js';

Object.setPrototypeOf(Business, BaseComponent);
export function Business(parentNode, business) {
  BaseComponent.apply(this, [parentNode, 'div']);
  this.business = business;
}

Business.prototype.render = function () {
  const { image, name, address, phone, reviewsCount, id } = this.business;

  // TODO: change this for default image constant
  // TODO: add event listener for error
  const component = `
    <div onclick="(() => {window.router.navigateTo('/business-${id}')})()">
      <img
        src="${image}"
        alt="${name} business"
        onerror="(() => {
          this.src = '../assets/default-image-not-found.jpeg'
        })()"
      />
      <hgroup>
        <h2>${name}</h2>
        <div class="space-between">
          <p>${address}</p>
        </div>
      </hgroup>
      <div class="space-between">
        <p>${phone}</p>
        <p>${reviewsCount}</p>
      </div>
    </div>
  `;

  this.container.innerHTML = component;

  this.parentNode.append(this.container);
};
