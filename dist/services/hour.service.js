import { WEEKDAYS } from '../common/constants.js';
export function formatHour(hourString) {
    const hour = Number(hourString.slice(0, 2)) % 24;
    const minutes = hourString.slice(2);
    const formattedHour = `${hour}:${minutes}`;
    const getTimePeriod = (hour) => (hour > 11 ? 'pm' : 'am');
    return `${formattedHour} ${getTimePeriod(hour)}`;
}
export function getFormattedHoursForDay([weekday, hours]) {
    const formattedHours = hours.map((hourObject) => `${formatHour(hourObject.start || '')} - ${formatHour(hourObject.end || '')}`);
    return [weekday, ...formattedHours];
}
export function formatDayHours(hoursByDay) {
    return Object.entries(hoursByDay).map(getFormattedHoursForDay);
}
export function groupHoursByDay(arr) {
    const hoursByDay = arr.reduce((prevValue, currentValue) => {
        const weekday = WEEKDAYS[currentValue.day];
        const hoursToAppend = prevValue[weekday]
            ? [...prevValue[weekday], currentValue]
            : [currentValue];
        return Object.assign(Object.assign({}, prevValue), { [weekday]: hoursToAppend });
    }, {});
    return hoursByDay;
}
