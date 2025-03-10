import { YelpGraphqlApiConfig } from '../yelp-business-repository'
import { BusinessFromYelp, YelpSearchBusinessResponse } from '../yelp-business-repository.types'

const businessFromYelpMock: BusinessFromYelp = {
  id: '1',
  name: 'Test Business',
  display_phone: '1234567890',
  photos: ['https://test.com/image.jpg'],
  review_count: 10,
  location: {
    formatted_address: 'San Francisco',
  },
}

export const mockBusinessResponse: YelpSearchBusinessResponse = {
  data: {
    search: {
      business: [businessFromYelpMock],
    },
  },
}

export const mockYelpApiConfig: YelpGraphqlApiConfig = {
  apiUrl: 'https://example.com/graphql/v3',
}
