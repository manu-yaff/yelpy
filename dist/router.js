import { CUSTOM_EVENTS } from './common/constants.js';
import { $ } from './common/dom.js';
import { Layout } from './components/Layout.js';
import { BusinessDetailPage } from './pages/BusinessDetailPage.js';
import { BusinessSearchPage } from './pages/BusinessSearchPage.js';
import { HomePage } from './pages/HomePage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';
function Router() {
    const urlParams = {};
    const searchParams = {};
    const routes = [
        {
            path: '/',
            regex: /^\/$/,
            component: HomePage,
        },
        {
            path: '/search',
            regex: /^\/search?/,
            component: BusinessSearchPage,
        },
        {
            path: '/business/:id',
            regex: /^\/business\/([^\/]+)$/,
            component: BusinessDetailPage,
        },
    ];
    function getCurrentUrl() {
        return window.location.pathname + window.location.search;
    }
    function matchRoute(url) {
        var _a;
        const match = routes.find((route) => {
            const routeRegex = new RegExp(route.regex);
            if (routeRegex.test(url)) {
                const urlSegments = url.split('/');
                const pathSegments = route.path.split('/');
                urlSegments.forEach((segment, index) => {
                    if (pathSegments[index].startsWith(':')) {
                        const paramName = pathSegments[index].slice(1);
                        const paramValue = segment;
                        console.log(paramName);
                        console.log(paramValue);
                        urlParams[paramName] = paramValue;
                    }
                });
                return true;
            }
            return false;
        });
        return (_a = match === null || match === void 0 ? void 0 : match.component) !== null && _a !== void 0 ? _a : NotFoundPage;
    }
    function navigateTo(route) {
        history.pushState({}, '', route);
        const matchedComponent = matchRoute(route);
        const mainSection = $.getById($.MAIN);
        const component = matchedComponent();
        mainSection.replaceChildren();
        mainSection.appendChild(component.getContainer());
    }
    function getUrlParams() {
        return urlParams;
    }
    function getSearchParams() {
        const url = new URL(window.location.href);
        const _searchParams = url.searchParams;
        for (const [searchParamName, searchValue] of _searchParams.entries()) {
            searchParams[searchParamName] = searchValue;
        }
        return searchParams;
    }
    function preventATagFromDefault(event, targetPath) {
        event.preventDefault();
        const customEvent = new CustomEvent(CUSTOM_EVENTS.navigation, {
            detail: { targetPath },
        });
        window.dispatchEvent(customEvent);
    }
    function init() {
        const layoutContainer = Layout().getContainer();
        const currentUrl = getCurrentUrl();
        window.addEventListener('popstate', () => {
            navigateTo(currentUrl);
        });
        window.addEventListener(CUSTOM_EVENTS.navigation, (event) => {
            navigateTo(event.detail.targetPath);
        });
        $.querySelector('body').appendChild(layoutContainer);
        navigateTo(currentUrl);
    }
    return {
        init,
        getUrlParams,
        getSearchParams,
        navigateTo,
        preventATagFromDefault,
    };
}
function routerWrapper() {
    let instance = null;
    return function createRouter() {
        if (instance === null) {
            instance = Router();
        }
        return instance;
    };
}
export const getRouter = routerWrapper();
