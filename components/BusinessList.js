import { getBusinessBySearch } from '../external/api.js';
import { Business } from './Business.js';

export function BusinessList(list) {
  this.container = document.createElement('section');
  this.list = list;

  this.createBusinessList();
}

BusinessList.prototype.createBusinessList = function () {
  const businessComponents = this.list.map((business) => new Business(business).container);

  businessComponents.forEach(
    function appendBusiness(business) {
      this.container.append(business);
    }.bind(this)
  );
};
