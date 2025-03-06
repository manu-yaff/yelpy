package yelp

const searchBusinessQuery = `
  query SearchBusiness($searchTerm: String!, $location: String!) {
    search(term: $searchTerm, location: $location, limit: 10) {
      business {
        id
        name
        display_phone
        review_count
        photos
        location {
          formatted_address
        }
      }
    }
  }
`
