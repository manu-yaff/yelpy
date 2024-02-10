import { Business } from './Business.js';

export function BusinessList(parentNode, items = undefined) {
  this.container = $create('section');
  this.parentNode = parentNode;

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
      const businessComp = new Business(this.container, business);
      businessComp.render();
    }.bind(this)
  );

  this.parentNode.append(this.container);
};
