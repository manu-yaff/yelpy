import { OpeningDayHours } from './OpeningDayHours.js';
import { $ } from '../common/dom.js';

interface BusinessHoursProps {
  isOpen?: boolean;
  dayHours: Array<string[]>;
}

export function BusinessHours({ isOpen, dayHours }: BusinessHoursProps) {
  const componentContainer = $.createElement('div');
  const dayHoursContainerId = 'day-hours-container' as const;
  const markup = `
    <div>
      <h3>Business hours</h3>
      <p>${getOpeningStatus(isOpen)}</p>
      <div id="${dayHoursContainerId}"></div>
    </div>
  `;

  function getOpeningStatus(isOpen?: boolean) {
    if (isOpen == undefined) return 'Open right now? - Info not available';

    return isOpen ? 'Open' : 'Closed';
  }

  function getContainer(): HTMLElement {
    return componentContainer;
  }

  function initComponent(): void {
    componentContainer.insertAdjacentHTML('beforeend', markup);

    const dayHoursContainer = componentContainer.querySelector(`#${dayHoursContainerId}`);

    if (dayHours.length === 0) {
      dayHoursContainer?.insertAdjacentHTML(
        'beforeend',
        '<p>Day hours not available</p>'
      );

      return;
    }

    dayHours.forEach((item: string[]) => {
      const [, ...hoursIntervals] = item;

      const dayHourComp = OpeningDayHours({
        weekday: item[0],
        hours: hoursIntervals.join(' - '),
      });
      dayHoursContainer?.append(dayHourComp.getContainer());
    });
  }

  initComponent();

  return {
    getContainer,
  };
}
