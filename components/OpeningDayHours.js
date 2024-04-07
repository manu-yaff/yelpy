import { WEEKDAYS } from '../constants.js';

/**
 *
 * @param {Object} props
 * @example
 * props {
 *  weekday: 'Monday'
 *  hours: '8:00 am - 3:00 pm'
 * }
 */
export function OpeningDayHours({ weekday, hours }) {
  const componentContainer = document.createElement('div');

  const markup = `
    <div>
      <p>
        ${weekday} - ${hours}
      </p>
    </div>
  `;

  function initComponent() {
    componentContainer.insertAdjacentHTML('beforeend', markup);
  }

  function getContainer() {
    return componentContainer;
  }

  initComponent();

  return { getContainer };
}

/**
 *
 * @param {String} hourString
 * @example hoursString = '0800'
 * @returns formatted string - '8:00 am'
 */
export function formatHour(hourString) {
  const hour = hourString.slice(0, 2) % 24;
  const minutes = hourString.slice(2);
  const formattedHour = `${hour}:${minutes}`;

  const getTimePeriod = (hour) => (hour > 11 ? 'pm' : 'am');

  return `${formattedHour} ${getTimePeriod(hour)}`;
}

/**
 *
 * @param {Array} dayHours
 * @example dayHours [
 *  weekday: 'Monday'
 *  hours: {
 *    start: '0900'
 *    end: '1600'
 *  }
 * ]
 * @returns array - ['Monday', '9:00 am', '16:00 pm']
 */
export function getFormattedHoursForDay([weekday, hours]) {
  const formattedHours = hours.map(
    (hourObject) => `${formatHour(hourObject.start)} - ${formatHour(hourObject.end)}`
  );

  return [weekday, ...formattedHours];
}

/**
 *
 * @param {Object} hours
 * @example hours [
 *  {
 *    start: '0800'
 *    end: '1600'
 *    day: '0'
 *  },
 *  {
 *    start: '0800'
 *    end: '1600'
 *    day: '1'
 *  },
 * ]
 * @returns hours group by day
 */
export function groupHoursByDay(hours) {
  const hoursByDay = hours.reduce(function groupHours(groupByDayStore, currentValue) {
    const weekday = WEEKDAYS[currentValue.day];
    const hoursToAppend = groupByDayStore[weekday]
      ? [...groupByDayStore[weekday], currentValue]
      : [currentValue];

    return { ...groupByDayStore, [weekday]: hoursToAppend };
  }, {});

  return hoursByDay;
}

export function formatDayHours(hoursByDay) {
  return Object.entries(hoursByDay).map(getFormattedHoursForDay);
}
