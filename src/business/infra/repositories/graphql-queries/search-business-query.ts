export const SEARCH_BUSINESS_QUERY = `
  query SearchBusiness($searchTerm: String!, $location: String!) {
    search(term: $searchTerm, location: $location, limit: 10) {
      business {
        id
        name
        display_phone
        photos
        review_count
        location {
          formatted_address
        }
      }
    }
  }
`
