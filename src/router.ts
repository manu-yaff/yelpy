import { CUSTOM_EVENTS } from './common/constants.js';
import { $ } from './common/dom.js';
import { Layout } from './components/Layout.js';
import { BusinessDetailPage } from './pages/BusinessDetailPage.js';
import { BusinessSearchPage } from './pages/BusinessSearchPage.js';
import { HomePage } from './pages/HomePage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';

interface ComponentReturnedValue {
  getContainer: () => HTMLElement;
}

interface Route {
  path: string;
  regex: RegExp;
  component: (...arg: any[]) => ComponentReturnedValue;
}

function Router() {
  const urlParams: { [index: string]: string } = {};
  const searchParams: { [index: string]: string } = {};

  const routes: Array<Route> = [
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

  function getCurrentUrl(): string {
    return window.location.pathname + window.location.search;
  }

  function matchRoute(url: string) {
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

    return match?.component ?? NotFoundPage;
  }

  function navigateTo(route: string): void {
    history.pushState({}, '', route);

    const matchedComponent = matchRoute(route);
    const mainSection = $.getById($.MAIN);
    const component = matchedComponent();

    mainSection.replaceChildren();
    mainSection.appendChild(component.getContainer());
  }

  function getUrlParams(): Record<string, string> {
    return urlParams;
  }

  function getSearchParams(): Record<string, string> {
    const url = new URL(window.location.href);
    const _searchParams = url.searchParams;

    for (const [searchParamName, searchValue] of _searchParams.entries()) {
      searchParams[searchParamName] = searchValue;
    }

    return searchParams;
  }

  function preventATagFromDefault(event: Event, targetPath: string): void {
    event.preventDefault();

    const customEvent = new CustomEvent(CUSTOM_EVENTS.navigation, {
      detail: { targetPath },
    });

    window.dispatchEvent(customEvent);
  }

  function init(): void {
    const layoutContainer = Layout().getContainer();
    const currentUrl = getCurrentUrl();

    window.addEventListener('popstate', () => {
      navigateTo(currentUrl);
    });

    window.addEventListener(CUSTOM_EVENTS.navigation, (event) => {
      navigateTo((event as CustomEvent).detail.targetPath);
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

function routerWrapper(): () => ReturnType<typeof Router> {
  let instance: ReturnType<typeof Router> | null = null;

  return function createRouter() {
    if (instance === null) {
      instance = Router();
    }

    return instance;
  };
}

export const getRouter = routerWrapper();
