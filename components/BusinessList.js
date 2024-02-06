import { getBusinessBySearch } from '../external/api.js';
import { Business } from './Business.js';

export function BusinessList() {
  this.container = document.createElement('section');
  this.list = undefined;
}

BusinessList.prototype.setBusinessList = function (list) {
  this.list = list;
};

BusinessList.prototype.createBusinessList = function () {
  this.container.innerHTML = '';

  if (this.list == undefined) return;

  if (this.list.length == 0) this.container.append('No results were found for your search');

  const businessComponents = this.list.map((business) => new Business(business).container);

  businessComponents.forEach(
    function appendBusiness(business) {
      this.container.append(business);
    }.bind(this)
  );
};
