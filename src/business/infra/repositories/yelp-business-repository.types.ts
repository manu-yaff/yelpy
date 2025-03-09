export interface YelpSearchBusinessResponse {
  data: {
    search: {
      business: BusinessFromYelp[]
    }
  }
}

export interface YelpBusinessDetailResponse {
  data: {
    business: BusinessDetailFromYelp
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

export interface BusinessDetailFromYelp extends BusinessFromYelp {
  hours: Array<Hour>
  reviews: Array<Review>
}

interface Hour {
  start: string
  end: string
  day: number
}

interface User {
  profile_url: string
  name: string
}

interface Review {
  id: string
  rating: number
  text: string
  time_created: string
  user: User
}
