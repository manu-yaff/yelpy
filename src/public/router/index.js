import { Layout } from '../components/Layout.js';
import { BusinessPage } from '../pages/BusinessPage.js';
import { HomePage } from '../pages/HomePage.js';
import { NotFoundPage } from '../pages/NotFoundPage.js';
import { SearchPage } from '../pages/SearchPage.js';

export class Router {
  #routes = [
    {
      path: '/',
      content: HomePage,
      regex: /^\/$/,
    },
    {
      path: '/search',
      content: SearchPage,
      regex: /^\/search\?search_term=[^&]+&location=[^&]+$/,
    },
    {
      path: '/business',
      content: BusinessPage,
      regex: /^\/business\/([^\/]+)$/,
    },
  ];

  constructor() {
    this.#init();
  }

  /**
   * Checks if the current url is a valid route
   * @returns {boolean} True if the route is valid, false otherwise
   */
  isValidRoute(candidateRoute) {
    for (const route of this.#routes) {
      // TODO: check if I should instead have the regex object in the routes object
      const regexObject = new RegExp(route.regex);

      if (regexObject.test(candidateRoute)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Gets the current route, which is the pathname + search params
   * @returns {string} The route with search params (if present)
   */
  #getFullCurrentRoute() {
    const { location } = window;

    return location.pathname + location.search;
  }

  /*
   * Gets the current pathname from the url
   * @returns {string} The current path, eg. /business, /, /search
   */
  #getCurrentPathname() {
    return '/' + window.location.pathname.split('/')[1];
  }

  /*
   * Initializes the router, and renders the corresponding view
   *
   */
  #init() {
    const currentRoute = this.#getFullCurrentRoute();

    if (this.isValidRoute(currentRoute)) {
      const layout = new Layout();

      const pageConstructor = this.#routes.find(
        (route) => route.path === this.#getCurrentPathname()
      ).content;

      const pageContent = new pageConstructor();

      document.body.append(layout.getContainer(), pageContent.getContainer());
    } else {
      const notFound = new NotFoundPage();

      document.body.appendChild(notFound.getContainer());
    }
  }
}
