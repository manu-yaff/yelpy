import { describe, expect, it } from 'vitest'
import { BusinessDetailMapper } from '.'
import { BusinessDetail } from '../../../domain/entities/BusinessDetail'
import {
  BusinessFromYelp,
  HourFromYelp,
  ReviewFromYelp,
} from '../../repositories/yelp-business/types'

describe(BusinessDetailMapper.name, () => {
  describe(BusinessDetailMapper.fromYelp.name, () => {
    it('should adapt business detail from yelp to entity', () => {
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

      const mockHours: Array<HourFromYelp> = [
        {
          is_open_now: false,
          open: {
            start: '0900',
            end: '2100',
            day: 0,
          },
        },
      ]

      const mockReviews: Array<ReviewFromYelp> = [
        {
          id: '1',
          rating: 0,
          text: 'Test review',
          time_created: '2024-12-27 14:33:48',
          user: {
            name: 'sam',
            profile_url: '',
          },
        },
      ]

      // Act
      const result = BusinessDetailMapper.fromYelp({
        ...mockBusinessFromYelp,
        hours: mockHours,
        reviews: mockReviews,
      })

      // Assert
      expect(result).toBeInstanceOf(BusinessDetail)
    })
  })
})
