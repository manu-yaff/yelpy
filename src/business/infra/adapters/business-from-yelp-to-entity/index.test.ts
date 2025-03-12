import { describe, expect, it } from 'vitest'
import { BusinessMapper } from '.'
import { Business } from '../../../domain/entities/Business'
import { BusinessFromYelp } from '../../repositories/yelp-business/types'

describe(BusinessMapper.name, () => {
  describe(BusinessMapper.fromYelp.name, () => {
    it('should adapt business from yelp api to business entity', () => {
      // Arrange
      const mockBusinessFromYelp: BusinessFromYelp = {
        id: 'TT7QK8t7A-0vvGUr1q-lbg',
        location: {
          formatted_address: 'Plaza Tapatía\nPaseo Degollado #63',
        },
        name: 'Los Potrillos',
        display_phone: '+52 33 3613 6136',
        review_count: 7,
        photos: ['https://s3-media4.fl.yelpcdn.com/bphoto/cLxG4S5xsvrdLCdnjRAOGg/o.jpg'],
      }

      // Act
      const business = BusinessMapper.fromYelp(mockBusinessFromYelp)

      // Assert
      expect(business).toBeInstanceOf(Business)
    })
  })
})
