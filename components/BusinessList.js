import { BusinessCard } from './BusinessCard.js';

/**
 * @param {Object} props
 * @example
 * props {
 *  items: [
 *    id: 'Y2Iqqe13-n7_60q9ND0vMA'
 *    imageUrl: 'https://s3-media1.fl.yelpcdn.com/bphoto/EPQjzmlcf6bjSsFo3paTXg/o.jpg'
 *    name: 'Burgers Jonh'
 *    address: 'San Francisco'
 *    phone: '+524424034677'
 *    reviewCount: 87
 *  ]
 * }
 */
export function BusinessList({ items }) {
  const container = document.createElement('div');
  const businessListId = 'business-list';

  const markup = `
    <div>
      <div id="${businessListId}"></div>
    </div>
  `;

  function initComponent() {
    container.insertAdjacentHTML('beforeend', markup);
    const listElement = container.querySelector(`#${businessListId}`);

    if (items.length === 0) {
      const emptyState = document.createElement('p');
      emptyState.insertAdjacentText('beforeend', 'No business were found for your search');

      listElement.appendChild(emptyState);
      return;
    }

    items.forEach((item) => {
      const businessComp = BusinessCard(item);
      listElement.appendChild(businessComp.getContainer());
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
