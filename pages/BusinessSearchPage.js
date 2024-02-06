import { BusinessList } from '../components/BusinessList.js';
import { SearchForm } from '../components/SearchForm.js';

export function SearchPage() {
  this.businessListData = {};
  this.container = document.createElement('section');
  this.businessListProxy = new Proxy(this.businessListData, {
    set: this.renderBusinessList.bind(this),
  });
}

SearchPage.prototype.render = function () {
  this.searchForm = new SearchForm(this.setBusinessListProxy.bind(this));
  this.container.append(this.searchForm.container);

  body.append(this.container);
};

SearchPage.prototype.renderBusinessList = function (obj, property, newValue) {
  const businessListComponent = BusinessList(newValue);
  this.container.append(businessListComponent);

  return true;
};

SearchPage.prototype.setBusinessListProxy = function (property, value) {
  this.businessListProxy[property] = value;
};
