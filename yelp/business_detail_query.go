package yelp

const BusinessDetailQuery = `
  query Business($id: String!) {
    business(id: $id) {
      id
      name
      display_phone
      review_count
      photos
      location {
        formatted_address
      }
      hours {
        is_open_now
        open {
          end
          start
          day
        }
      }
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
    }
}`
