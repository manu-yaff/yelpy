import { gql } from '@apollo/client';

export const SEARCH_QUERY = gql`
	query ($term: String!, $location: String!, $limit: Int!) {
		search(term: $term, location: $location, limit: $limit) {
			business {
				id
				photos
				name
				location {
					address1
					city
					state
					country
				}
				review_count
				display_phone
			}
		}	
	}
`;

