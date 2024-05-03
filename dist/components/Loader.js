import { $ } from '../common/dom.js';
export function Loader() {
    const componentContainer = $.createElement('p');
    function initComponent() {
        componentContainer.textContent = 'Loading...';
        componentContainer.setAttribute('aria-busy', 'true');
    }
    function getContainer() {
        return componentContainer;
    }
    initComponent();
    return {
        getContainer,
    };
}
