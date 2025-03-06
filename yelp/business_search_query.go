package yelp

const searchBusinessQuery = `
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
`
