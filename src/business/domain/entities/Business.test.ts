import { describe, expect, it } from 'vitest'
import { Business, defaultImageUrlMessage, defaultPhoneMessage } from './Business'

describe(Business.name, () => {
  const mockBusiness = {
    id: '1',
    name: 'Test Business',
    phone: '4698761234',
    address: 'San Francisco',
    reviewCount: 10,
    photos: ['https://test.com/image.jpg'],
  }

  describe('id', () => {
    it('should return id', () => {
      const business = new Business({ ...mockBusiness })

      expect(business.id).toBe(mockBusiness.id)
    })
  })

  describe('name', () => {
    it('should return name', () => {
      const business = new Business({ ...mockBusiness })

      expect(business.name).toBe(mockBusiness.name)
    })
  })

  describe('phone', () => {
    it('should return phone if present', () => {
      const business = new Business({ ...mockBusiness })

      expect(business.phone).toBe(mockBusiness.phone)
    })

    it('should return phone if not present present', () => {
      const business = new Business({ ...mockBusiness, phone: '' })

      expect(business.phone).toBe(defaultPhoneMessage)
    })
  })

  describe('address', () => {
    it('should return address', () => {
      const business = new Business({ ...mockBusiness })

      expect(business.address).toBe(mockBusiness.address)
    })
  })

  describe('review count', () => {
    it('should return review count', () => {
      const business = new Business({ ...mockBusiness })

      expect(business.reviewCount).toBe(business.reviewCount)
    })
  })

  describe('image url', () => {
    it('should return image url if present', () => {
      const business = new Business({ ...mockBusiness })

      expect(business.imageUrl).toBe(mockBusiness.photos[0])
    })

    it('should return default image url if not present', () => {
      const business = new Business({ ...mockBusiness, photos: [] })

      expect(business.imageUrl).toBe(defaultImageUrlMessage)
    })
  })
})
