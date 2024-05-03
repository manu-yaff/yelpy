import { $ } from '../common/dom.js';

export function Loader() {
  const componentContainer = $.createElement('p');

  function initComponent(): void {
    componentContainer.textContent = 'Loading...';
    componentContainer.setAttribute('aria-busy', 'true');
  }

  function getContainer(): HTMLElement {
    return componentContainer;
  }

  initComponent();

  return {
    getContainer,
  };
}
