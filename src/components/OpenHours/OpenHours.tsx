import { Day, OpenHoursProps } from "../../types/OpenHoursProps";
import styles from './OpenHours.module.scss';

const OpenHours = (props: OpenHoursProps) => {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const date = new Date();
  console.log('hello', props.hours.open);
  return (
    <>
      {props.hours.open.map((day: Day) => {
        return <div className={styles['open-hours']}>
          <p>{weekday[day.day]}</p>
          <div>
            <span>{day.start}</span>-<span>{day.end}</span>
          </div>
        </div>
      })}
    </>
  )
}

export default OpenHours;