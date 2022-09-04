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
			<br />
			{businesHours?.is_open_now ? (
				<p className={style['open']}>Open</p>
			) : (
				<p className={style['closed']}>Closed</p>
			)}
			{businesHours ? (
				businesHours.open.map((day) => {
					return <HourItem key={day.day} day={day} />;
				})
			) : (
				<h4>Business hours not available</h4>
			)}
		</>
	);
};

export default BusinessHours;
