import { BusinessSearchPage } from './pages/BusinessSearchPage.js';
import { CUSTOM_EVENTS } from './constants.js';
import { BusinessDetailPage } from './pages/BusinessDetailPage.js';

export function Router() {
  const urlParams = {};

  const routes = [
    {
      path: '/',
      component: BusinessSearchPage,
    },
    {
      path: '/business/:id',
      component: BusinessDetailPage,
    },
  ];

  function matchRoute(url) {
    function routeSegmentsEqualToUrlSegments(routeSegments, urlSegments) {
      return routeSegments.length == urlSegments.length;
    }

    function extractUrlParams(routeSegments, urlSegments) {
      routeSegments.forEach((routeSegment, index) => {
        if (routeSegment.startsWith(':')) {
          const paramName = routeSegment.split(':').slice(1);
          const paramValue = urlSegments[index];

          urlParams[paramName] = paramValue;
        }
      });
    }

    const match = routes.find((route) => {
      if (route.path == url) {
        return true;
      }

      const routeSegments = route.path.split('/');
      const urlSegments = url.split('/');

      if (!routeSegmentsEqualToUrlSegments) return false;

      const hasMatched = routeSegments.every(
        (segment, index) => segment === urlSegments[index] || segment.startsWith(':')
      );

      if (hasMatched) {
        extractUrlParams(routeSegments, urlSegments);
        return true;
      }
    });

    return match?.component ?? '404';
  }

  async function navigateTo(route) {
    history.pushState({}, '', route);
    const matchedComponent = matchRoute(route);

    const body = document.querySelector('main');

    body.replaceChildren();

    const component = await matchedComponent();
    body.appendChild(component.getContainer());
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

    navigateTo(currentUrl);
  }

  function getCurrentUrl() {
    return window.location.pathname;
  }

  function getUrlParams() {
    return urlParams;
  }

  return { init, getUrlParams, navigateTo, preventATagFromDefault };
}
