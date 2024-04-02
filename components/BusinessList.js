import { BusinessCard } from './BusinessCard.js';

export function BusinessList({ items }) {
  const container = document.createElement('div');
  const businessListId = 'business-list';

  const markup = `
    <div>
      <div id="${businessListId}"></div>
    </div>
  `;

  initComponent();

  function initComponent() {
    container.insertAdjacentHTML('beforeend', markup);
    const listElement = container.querySelector(`#${businessListId}`);

    if (items.length === 0) {
      const emptyState = document.createElement('p');
      emptyState.insertAdjacentText('beforeend', 'No business were found for your search');

      listElement.appendChild(emptyState);
      return;
    }

    items.map((item) => {
      const businessComp = BusinessCard(item);
      listElement.appendChild(businessComp.getContainer());
    });
  }

  function getMarkup() {
    return markup;
  }

  function getContainer() {
    return container;
  }

  return {
    getMarkup,
    getContainer,
  };
}
