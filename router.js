import { BusinessDetailPage } from './pages/BusinessDetailPage.js';
import { SearchPage } from './pages/BusinessSearchPage.js';

export function Router() {
  this.routes = {
    '/': new SearchPage($query('body')),
    '/business-1': BusinessDetailPage(),
  };
}

Router.prototype.init = function () {
  const initialPath = window.location.pathname;
  const defaultRoute = '/';
  const route = Object.hasOwn(this.routes, initialPath) ? initialPath : defaultRoute;

  window.addEventListener('popstate', function listenForPushEvents() {
    console.log('route has changed');
  });

  this.navigateTo(route);
};

Router.prototype.navigateTo = function (location) {
  const body = document.querySelector('body');
  body.replaceChildren();

  history.pushState({}, '', location);

  if (location.startsWith('/business-')) {
    this.routes['/business-1'].render(body);
  } else {
    this.routes['/'].render();
  }
};
