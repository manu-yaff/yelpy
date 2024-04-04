import { BusinessList } from '../components/BusinessList.js';
import { SearchForm } from '../components/SearchForm.js';
import { getBusinessBySearch } from '../external/api.js';
import { FetchData } from '../utils/fetcher.js';

export function BusinessSearchPage() {
  const componentContainer = document.createElement('section');
  const listContainer = document.createElement('div');

  const searchForm = SearchForm({
    onFormSubmitted,
  });

  initComponent();

  function handleStateChanges(_, property, value, __) {
    const isLoading = property == 'loading' && value;
    const isError = property == 'error' && value;
    const isData = property == 'data' && value;

    if (isLoading) {
      listContainer.replaceChildren();
      listContainer.textContent = 'loading...';
    }

    if (isError) {
      listContainer.replaceChildren();
      listContainer.textContent = 'Error!';
    }

    if (isData) {
      const businessList = BusinessList({ items: value });
      listContainer.replaceChildren(businessList.getContainer());
    }

    return true;
  }

  function onFormSubmitted({ searchTerm, location }) {
    FetchData({
      observer: handleStateChanges,
      callback: () => getBusinessBySearch(searchTerm, location),
    });
  }

  function initComponent() {
    componentContainer.append(searchForm.getContainer());
    componentContainer.append(listContainer);
  }

  function getContainer() {
    return componentContainer;
  }

  return { getContainer };
}
