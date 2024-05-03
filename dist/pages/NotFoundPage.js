import { $ } from '../common/dom.js';
export function NotFoundPage() {
    const componentContainer = $.createElement('div');
    function getContainer() {
        return componentContainer;
    }
    function initComponent() {
        const notFound = $.createElement('p');
        notFound.textContent = '404 Page not found!';
        componentContainer.append(notFound);
    }
    initComponent();
    return {
        getContainer,
    };
}
