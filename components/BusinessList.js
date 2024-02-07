import { Business } from './Business.js';

export function BusinessList(parentNode, businessList = undefined) {
  this.container = $create('section');
  this.parentNode = parentNode;

  this.businessList = businessList;
}

BusinessList.prototype.render = function () {
  this.container.innerHTML = '';

  if (this.businessList == undefined) return;

  if (this.businessList.length == 0) this.container.append('No results were found for your search');

  this.businessList.forEach(
    function renderBusiness(business) {
      const businessComp = new Business(this.container, business);
      businessComp.render();
    }.bind(this)
  );

  this.parentNode.append(this.container);
};
