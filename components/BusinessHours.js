import { OpeningDayHours, formatDayHours } from './OpeningDayHours.js';

export function BusinessHours({ isOpen, dayHours }) {
  const componentContainer = document.createElement('div');
  const dayHoursContainerId = 'day-hours-container';
  const markup = `
    <div>
      <p>Business hours</p>
      <p>${isOpen}</p>
      <div id="${dayHoursContainerId}"></div>
    </div>
  `;

  initComponent();

  function initComponent() {
    componentContainer.insertAdjacentHTML('beforeend', markup);

    const dayHoursContainer = componentContainer.querySelector(`#${dayHoursContainerId}`);

    if (dayHours.length == 0) {
      dayHoursContainer.insertAdjacentHTML('beforeend', '<p>Day hours not available</p>');

      return;
    }

    dayHours.forEach((item) => {
      const [, ...rest] = item;

      const dayHourComp = OpeningDayHours({ weekday: item[0], hours: rest.join(' - ') });
      dayHoursContainer.append(dayHourComp.getContainer());
    });
  }

  function getContainer() {
    return componentContainer;
  }

  return {
    getContainer,
  };
}
