import { BusinessSearchPage } from './pages/BusinessSearchPage.js';
import { CUSTOM_EVENTS, MAIN_SECTION_ID } from './constants.js';
import { BusinessDetailPage } from './pages/BusinessDetailPage.js';
import { Layout } from './components/Layout.js';

export function Router() {
  const layoutContainer = Layout();
  const urlParams = {};

  const routes = [
    {
      path: '/',
      regex: /^\/$/,
      component: () => {
        const container = document.createElement('div');
        container.textContent = 'this is the home page, I should write something in here';

        return {
          getContainer: () => container,
        };
      },
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

  function matchRoute(url) {
    function routeSegmentsEqualToUrlSegments(routeSegments, urlSegments) {
      return routeSegments.length == urlSegments.length;
    }

    const match = routes.find((route) => {
      const routeRegex = new RegExp(route.regex);

      if (routeRegex.test(url)) {
        const urlSegments = url.split('/');
        const pathSegments = route.path.split('/');

        urlSegments.forEach((segment, index) => {
          if (pathSegments[index].startsWith(':')) {
            const paramName = pathSegments[index].slice(1);
            const paramValue = segment;

            urlParams[paramName] = paramValue;
          }
        });

        return true;
      }
    });

    return match?.component ?? '404';
  }

  async function navigateTo(route) {
    history.pushState({}, '', route);

    const matchedComponent = matchRoute(route);

    const mainSection = document.getElementById(MAIN_SECTION_ID);

    mainSection.replaceChildren();

    const component = await matchedComponent();
    mainSection.appendChild(component.getContainer());
  }

  function preventATagFromDefault(event, targetPath) {
    event.preventDefault();

    const customEvent = new CustomEvent(CUSTOM_EVENTS.navigation, { detail: { targetPath } });
    window.dispatchEvent(customEvent);
  }

  function init() {
    const currentUrl = getCurrentUrl();

    window.addEventListener('popstate', () => {
      navigateTo(getCurrentUrl());
    });

    window.addEventListener(CUSTOM_EVENTS.navigation, (event) => {
      navigateTo(event.detail.targetPath);
    });

    window.router = this;

    document.querySelector('body').appendChild(layoutContainer.getContainer());

    navigateTo(currentUrl);
  }

  function getCurrentUrl() {
    return window.location.pathname + window.location.search;
  }

  function getUrlParams() {
    return urlParams;
  }

  return { init, getUrlParams, navigateTo, preventATagFromDefault };
}
