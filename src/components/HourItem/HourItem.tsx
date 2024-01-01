import { FunctionComponent } from 'react';
import { Day } from '../../types/Time';
import style from './HourItem.module.scss';

interface IProps {
	day: Day;
}

const weekDays = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

const HourItem: FunctionComponent<IProps> = ({ day }) => {
	const checkAm = (hour: string) => {
		if (parseInt(hour) >= 12) return 'pm';
		return 'am';
	};

	const formatHour = (start: string, end: string) => {
		const [hour, min] = [start.slice(0, 2), start.slice(2)];
		const [hourEnd, minEnd] = [end.slice(0, 2), end.slice(2)];
		return `${hour}:${min} ${checkAm(hour)} - ${hourEnd}:${minEnd} ${checkAm(
			hourEnd
		)}`;
	};

	return (
		<div className={style['flex-container']}>
			<p>{weekDays[day.day]}</p>
			<p>{formatHour(day.start, day.end)}</p>
		</div>
	);
};

export default HourItem;
