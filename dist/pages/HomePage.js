import { $ } from '../common/dom.js';
export function HomePage() {
    const componentContainer = $.createElement('div');
    const markup = `
    <p>Welcome!</p>
    <p>
      This app uses Yelp Fusion API, which allows you to ge the best local
      content and reviews from the millions of business around the world
    </p>
  `;
    function getContainer() {
        return componentContainer;
    }
    function initComponent() {
        componentContainer.insertAdjacentHTML('beforeend', markup);
    }
    initComponent();
    return {
        getContainer,
    };
}
