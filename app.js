import { Router } from './js/router.js';

window.body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', function initApp() {
  const router = new Router();
  router.init();
});
