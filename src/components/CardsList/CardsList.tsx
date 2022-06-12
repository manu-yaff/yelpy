import { CardsListProp, Business } from '../../types/Business';
import styles from './CardsList.module.scss'
import BusinessCard from '../BusinessCard/BusinessCard';

const CardsList = (props: CardsListProp) => {
	if (props.businesses.length === 0) return <p>No businesses found. Try a new search</p>
	return (
		<div className={styles['cards-container']}>
		{props.businesses.map((item: Business) => {
				return <BusinessCard key={item.id} {...item}	/>
		})}
		</div>
	)
}

export default CardsList;
