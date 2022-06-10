import styles from './BusinessCard.module.scss';
import { Business } from '../../types/Business';
import { Link } from 'react-router-dom';
import EyeIcon from '../../assets/eye.png';

const BusinessCard = (props: Business) => {
	return (
		<Link
		className={styles['card']}
		to={`/negocio/${props.id}`}
		>
		<div>
			<img src={props.photos} alt="" />
			<div className={styles['flex-container']}>
				<h2>{props.name}</h2>
				{props.hasBeenSeen && <img src={EyeIcon} alt="" />}
			</div>
			<p className={styles['card__location']}>
				{props.location.address1}, {props.location.city}, {props.location.country}
			</p>
			<div className={styles['flex-container']}>
				<p>{props.review_count} reviews</p>
				<p>{props.display_phone}</p>
			</div>
		</div>
	</Link>

	)
}

export default BusinessCard;
