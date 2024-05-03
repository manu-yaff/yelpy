import { $ } from '../common/dom.js';

interface OpeningDayHoursProps {
  weekday: string;
  hours: string;
}

export function OpeningDayHours({ weekday, hours }: OpeningDayHoursProps) {
  const componentContainer = $.createElement('div');

  const markup = `
    <div>
      <p>
        ${weekday} - ${hours}
      </p>
    </div>
  `;

  function getContainer(): HTMLElement {
    return componentContainer;
  }

  function initComponent(): void {
    componentContainer.insertAdjacentHTML('beforeend', markup);
  }

  initComponent();

  return { getContainer };
}
