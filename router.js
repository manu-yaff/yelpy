import { BusinessDetailPage } from './pages/BusinessDetailPage.js';
import { SearchPage } from './pages/BusinessSearchPage.js';

export function Router() {
  this.routes = {
    '/': new SearchPage($query('body')),
    '/business-1': BusinessDetailPage,
  };
}

Router.prototype.init = function () {
  const initialPath = window.location.pathname;
  const defaultRoute = '/';
  const route = Object.hasOwn(this.routes, initialPath) ? initialPath : defaultRoute;

  window.addEventListener(
    'popstate',
    function listenForPushEvents(event) {
      console.log('route has changed');
      console.log(this);
      this.navigateTo(location.pathname);
    }.bind(this)
  );

  this.navigateTo(route);
};

Router.prototype.navigateTo = async function (location) {
  const body = document.querySelector('body');
  body.replaceChildren();

  history.pushState({}, '', location);

  if (location.startsWith('/business-')) {
    const businessDetail = await this.routes['/business-1']();
    businessDetail.render(body);
  } else {
    this.routes['/'].render();
  }
};
