export interface YelpSearchBusinessResponse {
  data: {
    search: {
      business: BusinessFromYelp[]
    }
  }
}

export interface BusinessFromYelp {
  id: string
  name: string
  display_phone: string
  photos: Array<string>
  review_count: number
  location: {
    formatted_address: string
  }
}
