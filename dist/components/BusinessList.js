import { BusinessCard } from './BusinessCard.js';
import { $ } from '../common/dom.js';
export function BusinessList({ items }) {
    const container = $.createElement('div');
    const businessListId = 'business-list';
    const markup = `
    <div>
      <h3>Results for your search</h3>
      <div id="${businessListId}" class="business-list"></div>
    </div>
  `;
    function initComponent() {
        container.insertAdjacentHTML('beforeend', markup);
        const listElement = container.querySelector(`#${businessListId}`);
        if (items.length === 0) {
            const emptyState = $.createElement('p');
            emptyState.insertAdjacentText('beforeend', 'No business were found for your search');
            listElement === null || listElement === void 0 ? void 0 : listElement.appendChild(emptyState);
            return;
        }
        items.forEach((item) => {
            const businessComp = BusinessCard(item);
            listElement === null || listElement === void 0 ? void 0 : listElement.appendChild(businessComp.getContainer());
        });
    }
    function getContainer() {
        return container;
    }
    initComponent();
    return {
        getContainer,
    };
}
