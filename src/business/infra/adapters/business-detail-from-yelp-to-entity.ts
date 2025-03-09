import { BusinessDetailEntity } from '../../domain/entities/BusinessDetail'
import { BusinessDetailFromYelp } from '../repositories/yelp-business-repository.types'

export function businessDetailFromApiToBusinessDetailEntity(
  businessDetail: BusinessDetailFromYelp
): BusinessDetailEntity {
  return new BusinessDetailEntity()
}
