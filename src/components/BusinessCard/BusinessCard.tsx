import styles from './BusinessCard.module.scss';
import { Business } from '../../types/Business';
import { FaEye } from 'react-icons/fa';

const BusinessCard = (props: Business) => {
	return (
		<div className={styles['card']}>
			<img src={props.photos} alt="" />
			<div className={styles['flex-container']}>
				<h2>{props.name}</h2>
				<p><FaEye /></p>
			</div>
			<p className={styles['card__location']}>
				{props.location.address1}, {props.location.city}, {props.location.country}
			</p>
			<div className={styles['flex-container']}>
				<p>{props.review_count} reviews</p>
				<p>{props.display_phone}</p>
			</div>
		</div>
	)
}

export default BusinessCard;
