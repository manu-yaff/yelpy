export const SEARCH_BUSINESS_QUERY = `
  query SearchBusiness($searchTerm: String!, $location: String!) {
    search(term: $searchTerm, location: $location, limit: 10) {
      business {
        id
        photos
        name
        location {
          formatted_address
        }
        review_count
        display_phone
      }
    }
  }
`;
export const BUSINESS_DETAIL_QUERY = `
  query Business($id: String!) {
    business(id: $id) {
      name
      id
      display_phone
      review_count
      rating
      hours {
        is_open_now
        open {
          end
          start
          day
        }
      }
      photos
      reviews(limit: 5) {
        id
        rating
        text
        time_created
        user {
          profile_url
          name
        }
      }
      location {
        formatted_address
      }
    }
  }
`;
