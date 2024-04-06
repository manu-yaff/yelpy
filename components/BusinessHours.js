import { OpeningDayHours } from './OpeningDayHours.js';

/**
 * @param {Object} props
 * @example
 * props {
 *  isOpen: true
 *  dayHours: [
 *    ['Monday', '9:00am - 8:00pm']
 *    ['Tuesday', '9:00am - 2:00pm', '16:00pm - 20:00pm']
 *  ]
 * }
 */
export function BusinessHours({ isOpen, dayHours }) {
  const componentContainer = document.createElement('div');
  const dayHoursContainerId = 'day-hours-container';
  const markup = `
    <div>
      <p>Business hours</p>
      <p>${getOpeningStatus(isOpen)}</p>
      <div id="${dayHoursContainerId}"></div>
    </div>
  `;

  function getOpeningStatus(isOpen) {
    if (isOpen === undefined) return 'Info not available';

    return isOpen ? 'Open' : 'False';
  }

  function getContainer() {
    return componentContainer;
  }

  function initComponent() {
    componentContainer.insertAdjacentHTML('beforeend', markup);

    const dayHoursContainer = componentContainer.querySelector(`#${dayHoursContainerId}`);

    if (dayHours.length == 0) {
      dayHoursContainer.insertAdjacentHTML('beforeend', '<p>Day hours not available</p>');

      return;
    }

    dayHours.forEach((item) => {
      const [, ...hoursIntervals] = item;

      const dayHourComp = OpeningDayHours({ weekday: item[0], hours: hoursIntervals.join(' - ') });
      dayHoursContainer.append(dayHourComp.getContainer());
    });
  }

  initComponent();

  return {
    getContainer,
  };
}
