import { FunctionComponent } from 'react';
import { Hour } from '../../types/Time';
import HourItem from '../HourItem/HourItem';
import style from './BusinessHours.module.scss';

interface IProps {
	businesHours: Hour;
}

const BusinessHours: FunctionComponent<IProps> = ({ businesHours }) => {
	return (
		<>
			<h3>Business hours</h3>
			{businesHours.is_open_now ? (
				<p className={style['open']}>Open</p>
			) : (
				<p className={'closed'}>Close</p>
			)}
			{businesHours.open.map((day) => (
				<HourItem key={day.day} day={day} />
			))}
		</>
	);
};

export default BusinessHours;
