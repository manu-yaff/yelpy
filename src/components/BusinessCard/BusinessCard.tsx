import { FunctionComponent } from 'react';
import { Business } from '../../types/Buesiness';
import imgPlaceholder from '../../assets/img-placeholder.png';
import style from './BusinessCard.module.scss';
import { Link } from 'react-router-dom';

interface IProps {
	business: Business;
}

const BusinessItem: FunctionComponent<IProps> = ({ business }) => {
	const { address1, city, state, country } = business.location;
	return (
		<Link to={`/business/${business.id}`}>
			<div className={style['business-card']}>
				<img
					className={style['business-card__image']}
					src={business.photos ? business.photos[0] : imgPlaceholder}
					alt="business"
					onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
						(event.currentTarget.src = imgPlaceholder)
					}
				/>
				<h2>{business.name}</h2>
				<h3>
					{address1}, {city}, {state}, {country}
				</h3>
				<div className={style['flex-container']}>
					<p>{business.review_count} reviews</p>
					<p>{business.display_phone}</p>
				</div>
			</div>
		</Link>
	);
};

export default BusinessItem;
