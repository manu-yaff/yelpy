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
  const dom = DOM();

  const defaultRoute = ROUTES.home;

  const regexRoutesMapping = {
    '/': /^\/$/,
    '/business-': /\/business-.+/,
  };

  const routesMapping = {
    [ROUTES.home]: businessCard,
    [ROUTES.detail]: {
      render: (container) => container.replaceChildren('detail page'),
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
      history.pushState({}, '', route);
      routesMapping[matchingRoute[0]].render(body);
    } else {
      history.pushState({}, '', '/');
      routesMapping[defaultRoute].render(body);
    }
  }

  // TODO: handle navigation backwards and forwards
  function init() {
    const route = getCurrentUrl();
    navigateTo(route);
  }

  return {
    getCurrentUrl,
    init,
    navigateTo,
  };
}
