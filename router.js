import { SearchPage } from './pages/BusinessSearchPage.js';

export function Router() {
  this.routes = {
    '/': new SearchPage($query('body')),
    '/business': 'business details content',
  };
}

Router.prototype.init = function () {
  const initialPath = window.location.pathname;
  const defaultRoute = '/';
  const route = Object.hasOwn(this.routes, initialPath) ? initialPath : defaultRoute;

  this.navigateTo(route);
};

Router.prototype.navigateTo = function (location) {
  this.routes[location].render();
};
