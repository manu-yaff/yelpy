import { OpeningDayHours } from './OpeningDayHours.js';
import { $ } from '../common/dom.js';
export function BusinessHours({ isOpen, dayHours }) {
    const componentContainer = $.createElement('div');
    const dayHoursContainerId = 'day-hours-container';
    const markup = `
    <div>
      <h3>Business hours</h3>
      <p>${getOpeningStatus(isOpen)}</p>
      <div id="${dayHoursContainerId}"></div>
    </div>
  `;
    function getOpeningStatus(isOpen) {
        if (isOpen == undefined)
            return 'Open right now? - Info not available';
        return isOpen ? 'Open' : 'Closed';
    }
    function getContainer() {
        return componentContainer;
    }
    function initComponent() {
        componentContainer.insertAdjacentHTML('beforeend', markup);
        const dayHoursContainer = componentContainer.querySelector(`#${dayHoursContainerId}`);
        if (dayHours.length === 0) {
            dayHoursContainer === null || dayHoursContainer === void 0 ? void 0 : dayHoursContainer.insertAdjacentHTML('beforeend', '<p>Day hours not available</p>');
            return;
        }
        dayHours.forEach((item) => {
            const [, ...hoursIntervals] = item;
            const dayHourComp = OpeningDayHours({
                weekday: item[0],
                hours: hoursIntervals.join(' - '),
            });
            dayHoursContainer === null || dayHoursContainer === void 0 ? void 0 : dayHoursContainer.append(dayHourComp.getContainer());
        });
    }
    initComponent();
    return {
        getContainer,
    };
}
