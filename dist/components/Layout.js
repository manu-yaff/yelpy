import { ROUTES } from '../common/constants.js';
import { $ } from '../common/dom.js';
import { getRouter } from '../router.js';
import { SearchForm } from './SearchForm.js';
export function Layout() {
    const componentContainer = $.querySelector($.MAIN);
    const pageContainer = $.createElement('section');
    const router = getRouter();
    const { search_term: searchTerm, location } = router.getSearchParams();
    const searchForm = SearchForm({
        searchTerm,
        location,
        onFormSubmitted,
    });
    function onFormSubmitted({ searchTerm, location, }) {
        const url = new URL(window.location.href);
        url.searchParams.set('search_term', searchTerm);
        url.searchParams.set('location', location);
        router.navigateTo(`${ROUTES.search}${url.search}`);
    }
    function getContainer() {
        return componentContainer;
    }
    function initComponent() {
        pageContainer.setAttribute('id', $.MAIN);
        componentContainer.appendChild(searchForm.getContainer());
        componentContainer.appendChild(pageContainer);
    }
    initComponent();
    return {
        getContainer,
    };
}
