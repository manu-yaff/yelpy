import { BusinessCard } from './components/BusinessCard.js';
import { BusinessDetailPage } from './pages/BusinessDetailPage.js';
import { SearchPage } from './pages/BusinessSearchPage.js';
import { DOM } from './utils/dom.js';
import { ROUTES } from './constants.js';

///////////////////////////////////////////////////////
const businessCard = BusinessCard({
  id: 'Y2Iqqe13-n7_60q9ND0vMA',
  imageUrl: 'https://google.com',
  name: 'Tacos San Juan',
  address: 'San Juan de los Lagos',
  phone: '4659081243',
  reviews: 10,
});
///////////////////////////////////////////////////////

export function Router() {
  const urlParams = {};

  const routes = [
    {
      path: '/',
      component: businessList,
    },
    {
      path: '/login',
      component: 'this is the login component is the home component',
    },
    {
      path: '/settings',
      component: 'this is the settings component',
    },
    {
      path: '/help',
      component: 'this is the help component',
    },
    {
      path: '/business/:id',
      component: {
        getContainer: () => {
          const el = document.createElement('div');
          el.textContent = 'this is the business id route';
          return el;
        },
      },
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

      // check the path matches with the parametized route
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

    return match?.component ?? '404 not found';
  }

  function navigateTo(route) {
    history.pushState({}, '', route);
    const matchedComponent = matchRoute(route);

    const body = document.querySelector('main');

    body.replaceChildren();
    body.appendChild(matchedComponent.getContainer());
  }

  function preventATagsFromDefault() {
    const aTags = document.querySelectorAll('a');

    aTags.forEach(function setEventListener(aTag) {
      aTag.addEventListener('click', function preventDefault(event) {
        event.preventDefault();

        const href = aTag.getAttribute('href');
        navigateTo(href);
      });
    });
  }

  function init() {
    const currentUrl = getCurrentUrl();

    preventATagsFromDefault();
    navigateTo(currentUrl);
  }

  function getCurrentUrl() {
    return window.location.pathname;
  }

  function getUrlParams() {
    return urlParams;
  }

  return { init, getUrlParams, navigateTo };
}
