import { Business } from '../../types/Business';
import BusinessCard from '../BusinessCard/BusinessCard';
import { useQuery } from '@apollo/client';
import { SEARCH_QUERY } from '../../graphql/queries';

const CardsList = () => {
	const { loading, error, data } = useQuery(SEARCH_QUERY, {
		variables: {
			term: "tacos",
			location: "san francisco",
			limit: 10
		}
	});

	if(loading) {
		return <p>Loading</p>
	}

	if (error) {
		return <p>Error</p>
	}

	console.log(data.search)
		// { data.search.business.map((item: Business) => {
		// 	return <BusinessCard business={item} />
		// 	})
		// }

	// const ob: Business = {
	// 	id: "1",
	// 	photos: "nada",
	// 	name: "nada",
	// 	location:  {
	// 		address1: 'Nuevo Leon',
	// 		city: 'SF',
	// 		country: 'Mexico'
	// 	},
	// 	review_count: 100,
	// 	display_phone: '1234567'
	// };
	//<BusinessCard {...ob} />
	// console.log(ob.id);
	return (
		<>
		{ data.search.business.map((item: Business) => {
				return <BusinessCard {...item}	/>

			}) }
		</>
	)
}

export default CardsList;
