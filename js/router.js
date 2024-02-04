import { BusinessList } from '../components/BusinessList.js';
import { BusinessSearchPage } from '../pages/BusinessSearchPage.js';

export const Router = {
  routes: {
    '/': BusinessSearchPage,
    '/business': 'business details content',
  },

  navigateTo: function (location) {
    Router.routes[location]();
  },

  init: function () {
    const initialPath = window.location.pathname;
    const defaultRoute = '/';
    const route = Object.hasOwn(Router.routes, initialPath) ? initialPath : defaultRoute;

    Router.navigateTo(route);
  },
};

// async function navigateTo(location) {
//   history.pushState({}, '', location);
//   await routes[location]();
// }

// function initRouter() {
//   const initialPath = window.location.pathname;
//   const defaultRoute = '/';
//   const route = Object.hasOwn(routes, initialPath) ? initialPath : defaultRoute;

//   navigateTo(route);
// }
