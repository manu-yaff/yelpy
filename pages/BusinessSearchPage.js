import { BusinessList } from '../components/BusinessList.js';
import { SearchForm } from '../components/SearchForm.js';
import { getBusinessBySearch } from '../external/api.js';

export function SearchPage() {
  this.businessListData = {
    loading: false,
    error: null,
    data: [],
  };
  this.loader = $create('p');
  this.error = $create('p');
  this.container = $create('section');
  this.businessList = new BusinessList(this.businessListData.data);
  this.businessListProxy = new Proxy(this.businessListData, {
    set: this.renderBusinessList.bind(this),
  });
}

SearchPage.prototype.render = function () {
  const searchForm = new SearchForm(this.setBusinessListProxy.bind(this));
  this.container.append(searchForm.container);

  $query('body').append(this.container);
};

SearchPage.prototype.renderBusinessList = function (_, property, newValue) {
  if (property == 'loading' && newValue == true) {
    this.loader.textContent = 'loading';
    this.loader.setAttribute('aria-busy', true);

    this.businessList.setBusinessList(undefined);
    this.businessList.createBusinessList();
    this.container.append(this.loader);
  }

  if (property == 'error') {
    this.loader.remove();
    this.error.textContent = 'jajaja error';
    this.container.append(this.error);
  }

  if (property == 'data') {
    this.loader.remove();
    this.error.remove();
    this.businessList.setBusinessList(newValue);
    this.businessList.createBusinessList();
    this.container.append(this.businessList.container);
  }

  return true;
};

SearchPage.prototype.setBusinessListProxy = async function (search, location) {
  this.businessListProxy.loading = true;
  const result = await getBusinessBySearch(search, location);
  this.businessListProxy.loading = false;
  this.businessListProxy.data = result;
  // this.businessListProxy.error = 'crazy error!!!';
};
