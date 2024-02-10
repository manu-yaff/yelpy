import { BusinessList } from '../components/BusinessList.js';
import { Loader } from '../components/Loader.js';
import { Error } from '../components/Error.js';
import { SearchForm } from '../components/SearchForm.js';
import { getBusinessBySearch } from '../external/api.js';
import { Fetcher } from '../utils/fetcher.js';

export function SearchPage(parentNode) {
  this.parentNode = parentNode;
  this.container = $create('section');
  this.error = $create('p');
  this.listContainer = $create('div');

  this.error = new Error(this.listContainer);
  this.loader = new Loader(this.listContainer);
  this.businessList = new BusinessList(this.listContainer);
  this.fetcher = new Fetcher(this.observeState.bind(this));
}

SearchPage.prototype.render = function () {
  const searchForm = new SearchForm(this.container, this.onFormSubmitted.bind(this));
  searchForm.render();

  this.container.append(this.listContainer);
  this.parentNode.append(this.container);
};

SearchPage.prototype.onFormSubmitted = async function (formValues) {
  const { searchTerm, location } = formValues;

  this.fetcher.fetchData(() => getBusinessBySearch(searchTerm, location));
};

SearchPage.prototype.observeState = function (obj, property, newValue) {
  if (property == 'loading' && newValue == true) {
    this.listContainer.replaceChildren();
    this.loader.render();
  }

  if (property == 'loading' && newValue == false) {
    this.loader.remove();
  }

  if (property == 'data') {
    this.businessList.setItems(newValue);
    this.businessList.render();
  }

  if (property == 'error' && newValue != null) {
    this.listContainer.replaceChildren();
    this.error.render();
  }

  if (property == 'error' && newValue == null) {
    this.error.remove();
  }

  return true;
};
