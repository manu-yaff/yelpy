import { BusinessList } from '../components/BusinessList.js';
import { ErrorComponent } from '../components/Error.js';
import { Loader } from '../components/Loader.js';
import { SearchForm } from '../components/SearchForm.js';
import { getBusinessBySearch } from '../external/api.js';
import { FetchData } from '../utils/fetcher.js';

export function BusinessSearchPage() {
  const componentContainer = document.createElement('section');
  const listContainer = document.createElement('div');
  const errorComponent = ErrorComponent();
  const loaderComponent = Loader();

  const searchForm = SearchForm({
    onFormSubmitted,
  });

  function handleStateChanges(_, property, value, __) {
    const isLoading = property == 'loading' && value;
    const isError = property == 'error' && value;
    const isData = property == 'data' && value;

    if (isLoading) {
      listContainer.replaceChildren();
      listContainer.appendChild(loaderComponent.getContainer());
    }

    if (isError) {
      listContainer.replaceChildren();
      listContainer.appendChild(errorComponent.getContainer());
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

  function getContainer() {
    return componentContainer;
  }

  function initComponent() {
    componentContainer.append(searchForm.getContainer());
    componentContainer.append(listContainer);
  }

  initComponent();

  return { getContainer };
}
