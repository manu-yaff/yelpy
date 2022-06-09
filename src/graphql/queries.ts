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


export const GET_BUSINESS_DETAIL = gql`
	query ($id: String) {
		business(id: $id) {
			name
			photos
			location {
				address1
				city
				state
				country
			}
			display_phone
			is_closed
			hours {
				is_open_now
				open {
					day
					start
					end
				}
			}
			review_count
			reviews {
				rating
				text
				user {
					name,
					image_url,
				}
				rating
			}
		}
	}
`