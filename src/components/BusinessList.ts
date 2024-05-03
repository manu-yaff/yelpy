import { BusinessCard } from './BusinessCard.js';
import { $ } from '../common/dom.js';
import { BusinessEntity } from '../common/entities.js';

interface BusinessListProps {
  items: Array<BusinessEntity>;
}

export function BusinessList({ items }: BusinessListProps) {
  const container = $.createElement('div');
  const businessListId = 'business-list';

  const markup = `
    <div>
      <h3>Results for your search</h3>
      <div id="${businessListId}" class="business-list"></div>
    </div>
  `;

  function initComponent(): void {
    container.insertAdjacentHTML('beforeend', markup);

    const listElement = container.querySelector(`#${businessListId}`);

    if (items.length === 0) {
      const emptyState = $.createElement('p');

      emptyState.insertAdjacentText(
        'beforeend',
        'No business were found for your search'
      );

      listElement?.appendChild(emptyState);
      return;
    }

    items.forEach((item: BusinessEntity) => {
      const businessComp = BusinessCard(item);

      listElement?.appendChild(businessComp.getContainer());
    });
  }

  function getContainer(): HTMLElement {
    return container;
  }

  initComponent();

  return {
    getContainer,
  };
}
