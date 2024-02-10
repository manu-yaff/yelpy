import { Router } from './router.js';

window.$ = document;
window.$create = (element) => $.createElement(element);
window.$query = (element) => $.querySelector(element);

$.addEventListener('DOMContentLoaded', function initApp() {
  const router = new Router();
  router.init();
});
