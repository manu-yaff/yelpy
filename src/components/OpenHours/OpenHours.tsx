import { Day, OpenHoursProps } from "../../types/OpenHoursProps";
import styles from './OpenHours.module.scss';

const OpenHours = (props: OpenHoursProps) => {
	const checkAm = (hour: number) => {
		if (hour > 12) return 'pm';
		return 'am'
	};

	const formatHour = (hour: string) => {
		const [hours, min] = [hour.slice(0, 2), hour.slice(2)];
		return `${hours}:${min} ${checkAm(parseInt(hours))}`
	};

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  return (
    <div className={styles['open-hours-container']}>
			<h1>Business hours</h1>
      {props.hours[0].open.map((hour: Day) => {
				return <div>
					<div className={styles['schedule']}>
						<p>{weekday[hour.day]}</p>
						<div className={styles['schedule__hours']}>
							<p>{formatHour(hour.start)} - {formatHour(hour.end)}</p>
						</div>
					</div>
				</div>
      })}
    </div>
  )
}

export default OpenHours;
