import { $ } from '../common/dom.js';
export function Button({ text, onClick, type = 'button' }) {
    const componentContainer = $.createElement('button');
    function initComponent() {
        componentContainer.setAttribute('type', type);
        componentContainer.textContent = text;
        addEventListenersToButton();
    }
    function getContainer() {
        return componentContainer;
    }
    function addEventListenersToButton() {
        componentContainer.addEventListener('click', function callClickHandler() {
            onClick();
        });
    }
    initComponent();
    return {
        getContainer,
    };
}
