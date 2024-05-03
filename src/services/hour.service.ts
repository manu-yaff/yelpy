import { WEEKDAYS } from '../common/constants.js';
import { HourEntity } from '../common/entities.js';

interface HourByDay {
  [index: string]: Array<HourEntity>;
}

export function formatHour(hourString: string): string {
  const hour = Number(hourString.slice(0, 2)) % 24;
  const minutes = hourString.slice(2);
  const formattedHour = `${hour}:${minutes}`;

  const getTimePeriod = (hour: number) => (hour > 11 ? 'pm' : 'am');

  return `${formattedHour} ${getTimePeriod(hour)}`;
}

export function getFormattedHoursForDay([weekday, hours]: [
  string,
  HourEntity[]
]): Array<string> {
  const formattedHours = hours.map(
    (hourObject) =>
      `${formatHour(hourObject.start || '')} - ${formatHour(hourObject.end || '')}`
  );

  return [weekday, ...formattedHours];
}

export function formatDayHours(hoursByDay: HourByDay): Array<string[]> {
  return Object.entries(hoursByDay).map(getFormattedHoursForDay);
}

export function groupHoursByDay(arr: HourEntity[]): HourByDay {
  const hoursByDay = arr.reduce((prevValue: HourByDay, currentValue: HourEntity) => {
    const weekday = WEEKDAYS[currentValue.day as number];

    const hoursToAppend = prevValue[weekday]
      ? [...prevValue[weekday], currentValue]
      : [currentValue];

    return { ...prevValue, [weekday]: hoursToAppend };
  }, {} as HourByDay);

  return hoursByDay;
}
