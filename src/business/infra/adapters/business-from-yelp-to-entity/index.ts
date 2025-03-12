import { Business } from '../../../domain/entities/Business'
import { BusinessFromYelp } from '../../repositories/yelp-business/types'

export class BusinessMapper {
  static fromYelp(business: BusinessFromYelp): Business {
    return new Business({
      id: business.id,
      name: business.name,
      phone: business.display_phone,
      address: business.location.formatted_address,
      reviewCount: business.review_count,
      photos: business.photos,
    })
  }
}
