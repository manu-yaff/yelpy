import { BaseComponent } from './BaseElement.js';
import { Business } from './Business.js';

Object.setPrototypeOf(BusinessList, BaseComponent);

export function BusinessList(parentNode, items = undefined) {
  BaseComponent.apply(this, [parentNode, 'section']);

  this.items = items;
}

BusinessList.prototype.setItems = function (items) {
  this.items = items;
};

BusinessList.prototype.render = function () {
  this.container.innerHTML = '';

  if (this.items == undefined) return;

  if (this.items.length == 0) this.container.append('No results were found for your search');

  this.items.forEach(
    function renderBusiness(business) {
      const businessComp = new Business(this.parentNode, business);
      businessComp.render();
    }.bind(this)
  );

  this.parentNode.append(this.container);
};
