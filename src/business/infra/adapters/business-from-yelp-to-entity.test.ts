import { describe, expect, it } from 'vitest'
import { BusinessFromYelp } from '../repositories/yelp-business-repository.types'
import { businessFromApiToBusinessEntity } from './business-from-yelp-to-entity'

describe(businessFromApiToBusinessEntity.name, () => {
  it('should adapt business from yelp api', () => {
    const businessFromYelp: BusinessFromYelp = {
      id: 'TT7QK8t7A-0vvGUr1q-lbg',
      location: {
        formatted_address: 'Plaza Tapatía\nPaseo Degollado #63',
      },
      name: 'Los Potrillos',
      display_phone: '+52 33 3613 6136',
      review_count: 7,
      photos: ['https://s3-media4.fl.yelpcdn.com/bphoto/cLxG4S5xsvrdLCdnjRAOGg/o.jpg'],
    }

    const business = businessFromApiToBusinessEntity(businessFromYelp)

    expect(business.id).toEqual('TT7QK8t7A-0vvGUr1q-lbg')
    expect(business.name).toEqual('Los Potrillos')
    expect(business.phone).toEqual('+52 33 3613 6136')
    expect(business.address).toEqual('Plaza Tapatía\nPaseo Degollado #63')
    expect(business.reviewCount).toEqual(7)
    expect(business.imageUrl).toEqual(
      'https://s3-media4.fl.yelpcdn.com/bphoto/cLxG4S5xsvrdLCdnjRAOGg/o.jpg'
    )
  })
})
