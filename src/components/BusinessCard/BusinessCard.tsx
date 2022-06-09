import styles from './BusinessCard.module.scss';
import { Business } from '../../types/Business';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BusinessCard = (props: Business) => {
	const handleClick = () => {

	};
	return (
		<Link
		className={styles['card']}
		to={`/negocio/${props.id}`}
		>
		<div onClick={handleClick} >
			<img src={props.photos} alt="" />
			<div className={styles['flex-container']}>
				<h2>{props.name}</h2>
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
