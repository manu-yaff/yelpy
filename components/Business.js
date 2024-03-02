import { BaseComponent } from '../components/BaseElement.js';

Object.setPrototypeOf(Business, BaseComponent);
export function Business(parentNode, business) {
  BaseComponent.apply(this, [parentNode, 'div']);
  this.business = business;
}

Business.prototype.render = function () {
  const { image, name, address, phone, reviewsCount } = this.business;

  const component = `
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
  `;

  this.container.innerHTML = component;

  this.parentNode.append(this.container);
};
