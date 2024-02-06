import { BusinessList } from '../components/BusinessList.js';
import { SearchForm } from '../components/SearchForm.js';

export function SearchPage() {
  this.businessListData = {};
  this.container = document.createElement('section');
  this.businessListProxy = new Proxy(this.businessListData, {
    set: renderBusinessList.bind(this),
  });
}

SearchPage.prototype.render = function () {
  this.searchForm = new SearchForm(setBusinessListProxy.bind(this));
  this.container.append(this.searchForm.container);

  body.append(this.container);
};

function renderBusinessList(_, __, newValue) {
  const businessList = new BusinessList(newValue);
  this.container.append(businessList.container);

  return true;
}

function setBusinessListProxy(property, value) {
  this.businessListProxy[property] = value;
}
