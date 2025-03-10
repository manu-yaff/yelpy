import { Business } from '../../domain/entities/business'
import { BusinessFromYelp } from '../repositories/yelp-business-repository.types'

export function businessFromApiToBusinessEntity(business: BusinessFromYelp): Business {
  return new Business({
    id: business.id,
    name: business.name,
    phone: business.display_phone,
    address: business.location.formatted_address,
    reviewCount: business.review_count,
    photos: business.photos,
  })
}
