import { BusinessList } from '../components/BusinessList.js';
import { ErrorComponent } from '../components/Error.js';
import { Loader } from '../components/Loader.js';
import { getBusinessBySearch } from '../external/api.js';
import { FetchData } from '../utils/fetcher.js';

export function BusinessSearchPage() {
  const componentContainer = document.createElement('section');
  const listContainer = document.createElement('div');
  const errorComponent = ErrorComponent();
  const loaderComponent = Loader();

  const { searchTerm, location } = getQueryParams();

  function getQueryParams() {
    const url = new URL(window.location.href);

    const searchTerm = url.searchParams.get('search_term');
    const location = url.searchParams.get('location');

    return { searchTerm, location };
  }

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

  function getContainer() {
    return componentContainer;
  }

  function initComponent() {
    FetchData({
      observer: handleStateChanges,
      callback: () => getBusinessBySearch(searchTerm, location),
    });

    componentContainer.append(listContainer);
  }

  initComponent();

  return { getContainer };
}
