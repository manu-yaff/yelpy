import { MAIN_SECTION_ID, ROUTES } from '../constants.js';
import { SearchForm } from './SearchForm.js';

export function Layout() {
  const componentContainer = document.querySelector('main');
  const pageContainer = document.createElement('section');
  const { searchTerm, location } = getQueryParams();

  const searchForm = SearchForm({
    searchTermValue: searchTerm,
    locationValue: location,
    onFormSubmitted,
  });

  function getQueryParams() {
    const url = new URL(window.location.href);

    const searchTerm = url.searchParams.get('search_term');
    const location = url.searchParams.get('location');

    return { searchTerm, location };
  }

  function onFormSubmitted({ searchTerm, location }) {
    const url = new URL(window.location.href);

    url.searchParams.set('search_term', searchTerm);
    url.searchParams.set('location', location);

    router.navigateTo(`${ROUTES.search}${url.search}`);
  }

  function getContainer() {
    return componentContainer;
  }

  function initComponent() {
    pageContainer.setAttribute('id', MAIN_SECTION_ID);

    componentContainer.appendChild(searchForm.getContainer());
    componentContainer.appendChild(pageContainer);
  }

  initComponent();

  return {
    getContainer,
  };
}
