export const businessDetailQuery = `
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
      reviews {
        id
        rating
        text
        user {
          name,
          image_url,
        }
      }
    }
  }
`
