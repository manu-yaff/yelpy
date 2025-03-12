import { BusinessDetail } from '../../../domain/entities/BusinessDetail'
import { OperatingHour } from '../../../domain/entities/OperatingHour'
import { Review } from '../../../domain/entities/Review'
import { User } from '../../../domain/entities/User'
import { BusinessDetailFromYelp } from '../../repositories/yelp-business/types'
import { BusinessMapper } from '../business-from-yelp-to-entity'

export class BusinessDetailMapper {
  static fromYelp(businessDetail: BusinessDetailFromYelp): BusinessDetail {
    const { hours, reviews, ...baseBusinessInfo } = businessDetail

    return new BusinessDetail({
      business: BusinessMapper.fromYelp(baseBusinessInfo),
      isOpen: hours[0].is_open_now,
      hours: hours[0].open.map(
        (h) => new OperatingHour({ start: h.start, end: h.end, day: h.day })
      ),
      reviews: reviews.map(
        (r) =>
          new Review({
            id: r.id,
            rating: r.rating,
            text: r.text,
            timeCreated: r.time_created,
            user: new User({
              name: r.user.name,
              profileUrl: r.user.image_url,
            }),
          })
      ),
    })
  }
}
