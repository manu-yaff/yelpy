import { Business } from '../components/Business.js';
import { BusinessList } from '../components/BusinessList.js';
import { SearchForm } from '../components/SearchForm.js';

export function SearchPage() {
  this.businessListData = {
    data: [],
  };
  this.container = document.createElement('section');
  this.businessList = new BusinessList(this.businessListData.data);
  this.businessListProxy = new Proxy(this.businessListData, {
    set: this.renderBusinessList.bind(this),
  });
}

SearchPage.prototype.render = function () {
  const searchForm = new SearchForm(setBusinessListProxy.bind(this));
  this.container.append(searchForm.container);

  body.append(this.container);
};

SearchPage.prototype.renderBusinessList = function (_, __, newValue) {
  this.businessList.setBusinessList(newValue);
  this.businessList.createBusinessList();
  this.container.append(this.businessList.container);

  return true;
};

function setBusinessListProxy(property, value) {
  this.businessListProxy[property] = value;
}
