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
  hours: Array<HourFromYelp>
  reviews: Array<ReviewFromYelp>
}

export interface HourFromYelp {
  is_open_now: boolean
  open: {
    start: string
    end: string
    day: number
  }
}

export interface UserFromYelp {
  profile_url: string
  name: string
}

export interface ReviewFromYelp {
  id: string
  rating: number
  text: string
  time_created: string
  user: UserFromYelp
}
