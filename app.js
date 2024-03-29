import { Router } from './router.js';

// TODO: delete this
window.$ = document;
window.$create = (element) => $.createElement(element);
window.$query = (element) => $.querySelector(element);

$.addEventListener('DOMContentLoaded', function initApp() {
  const router = new Router();
  window.router = router;
  router.init();
});
