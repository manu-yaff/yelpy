import { CardsListProp, Business } from '../../types/Business';
import BusinessCard from '../BusinessCard/BusinessCard';

const CardsList = (props: CardsListProp) => {
	return (
		<>
		{ props.businesses.map((item: Business) => {
				return <BusinessCard key={item.id} {...item}	/>

			}) }
		</>
	)
}

export default CardsList;
