import { BusinessDetailPage } from './pages/BusinessDetailPage.js';
import { SearchPage } from './pages/BusinessSearchPage.js';
import { DOM } from './utils/dom.js';

export function Router() {
  const dom = DOM();

  const routes = {
    home: '/',
    detail: '/detail',
  };

  const defaultRoute = routes.home;

  const regexRoutesMapping = {
    '/': /^\/$/,
    '/detail': /\/business-.+/,
  };

  const routesMapping = {
    [routes.home]: BusinessList(),
    [routes.detail]: {
      getMarkup: () => '<h1>detail page</h1>',
    },
  };

  function getCurrentUrl() {
    return window.location.pathname;
  }

  function navigateTo(route) {
    const body = document.querySelector('body');

    const matchingRoute = Object.entries(regexRoutesMapping).find(([_, regex]) =>
      regex.test(route)
    );

    if (matchingRoute) {
      dom.render(body, routesMapping[matchingRoute[0]].getMarkup());
    } else {
      history.pushState({}, '', '/');
      dom.render(body, routesMapping[defaultRoute].getMarkup());
    }
  }

  function init() {
    const route = getCurrentUrl();
    navigateTo(route);
  }

  return {
    getCurrentUrl,
    init,
  };
}
