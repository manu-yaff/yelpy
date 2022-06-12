import styles from './BusinessCard.module.scss';
import { Business } from '../../types/Business';
import { Link } from 'react-router-dom';
import EyeIcon from '../../assets/eye.png';
import ImagePlaceholder from '../../assets/chems.jpeg';
import { useSelector } from 'react-redux';
import { State } from '../../store'

const BusinessCard = (props: Business) => {
	const seenList = useSelector((state: State) => state.seenBusiness.seenBusinesses);

	const hasBeenSeen = (businessId: string) => {
		const seen = seenList.find((business: Business) => businessId === business.id);
		return seen ? true : false;
	};

	const imageErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		event.currentTarget.src = ImagePlaceholder;
	}

	const setImage = (hasImage: string): string => {
		if (hasImage) return hasImage
		return ImagePlaceholder
	}	
	return (
		<Link
		className={styles['card']}
		to={`/negocio/${props.id}`}
		>
			{<img src={setImage(props.photos)} alt="business" onError={imageErrorHandler} />}
			<div className={styles['card__heading']}>
				<h1>{props.name}</h1>
				{hasBeenSeen(props.id) && <img src={EyeIcon} alt="eye icon" />}
			</div>
			<p className={styles['card__location']}>
				{props.location.address1}, {props.location.city}, {props.location.country}
			</p>
			<div className={styles['card__reviews']}>
				<p>{props.review_count} reviews</p>
				<p>{props.display_phone}</p>
			</div>
		</Link>

	)
}

export default BusinessCard;
