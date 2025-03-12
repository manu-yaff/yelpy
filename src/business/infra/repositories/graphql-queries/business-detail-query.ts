export const BUSINESS_DETAIL_QUERY = `
  query ($id: String) {
    business(id: $id) {
      id
      name
      display_phone
      photos
      review_count
      location {
        formatted_address
      }
      hours {
        is_open_now
        open {
          day
          start
          end
        }
      }
      reviews(limit: 5) {
        id
        rating
        text
        time_created
        user {
          name,
          image_url,
        }
      }
    }
  }
`
