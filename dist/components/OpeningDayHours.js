import { $ } from '../common/dom.js';
export function OpeningDayHours({ weekday, hours }) {
    const componentContainer = $.createElement('div');
    const markup = `
    <div>
      <p>
        ${weekday} - ${hours}
      </p>
    </div>
  `;
    function getContainer() {
        return componentContainer;
    }
    function initComponent() {
        componentContainer.insertAdjacentHTML('beforeend', markup);
    }
    initComponent();
    return { getContainer };
}
