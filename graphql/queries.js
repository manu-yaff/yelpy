export const SEARCH_BUSINESS_QUERY = `
  query SearchBusiness($searchTerm: String!, $location: String!) {
    search(term: $searchTerm, location: $location, limit: 10) {
      business {
        photos
        name
        location {
          formatted_address
        }
        review_count
        phone
      }
    }
  }
`;
