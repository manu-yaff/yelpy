import { YelpGraphqlApiConfig } from '../yelp-business'
import {
  BusinessDetailFromYelp,
  BusinessFromYelp,
  YelpBusinessDetailResponse,
  YelpSearchBusinessResponse,
} from '../yelp-business/types'

const mockBusinessFromYelp: BusinessFromYelp = {
  id: 'M2Iqqe13-n7_60q9ND0vM0',
  name: 'Tacos Sureste',
  display_phone: '+52 442 403 4666',
  photos: ['https://s3-media1.fl.yelpcdn.com/bphoto/EPQjzmlcf6bjSsFo3paTXg/o.jpg'],
  review_count: 10,
  location: {
    formatted_address: 'Ignacio Allend',
  },
}

const mockBusinessDetailFromYelp: BusinessDetailFromYelp = {
  ...mockBusinessFromYelp,
  hours: [
    {
      is_open_now: true,
      open: [
        {
          start: '0000',
          end: '0000',
          day: 1,
        },
      ],
    },
  ],
  reviews: [
    {
      id: '1',
      rating: 10,
      text: 'Test review',
      time_created: '2024-09-24 04:05:22',
      user: {
        image_url: 'https://example.com/image.jpg',
        name: 'Test name',
      },
    },
  ],
}

export const mockBusinessResponse: YelpSearchBusinessResponse = {
  data: {
    search: {
      business: [mockBusinessFromYelp],
    },
  },
}

export const mockBusinessDetailResponse: YelpBusinessDetailResponse = {
  data: {
    business: mockBusinessDetailFromYelp,
  },
}

export const mockYelpApiConfig: YelpGraphqlApiConfig = {
  apiUrl: 'https://example.com/graphql/v3',
}

export const mockBusinessNotFound = {
  errors: [
    {
      message: 'The requested business could not be found.',
      locations: [
        {
          line: 3,
          column: 5,
        },
      ],
      path: ['business'],
      extensions: {
        code: 'BUSINESS_NOT_FOUND',
      },
    },
  ],
  data: {
    business: null,
  },
}
