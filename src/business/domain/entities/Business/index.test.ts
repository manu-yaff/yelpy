import { describe, expect, it } from 'vitest'
import { Business, BusinessType, defaultBusinessImageUrl, defaultPhoneMessage } from '.'

describe(Business.name, () => {
  describe(Business.prototype.id.name, () => {
    it('should return business id', () => {
      // Arrange
      const mockBusiness: BusinessType = {
        id: '1',
        name: 'Test Business',
        phone: '4698761234',
        address: 'San Francisco',
        reviewCount: 10,
        photos: ['https://test.com/image.jpg'],
      }

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.id()).toBe(mockBusiness.id)
    })
  })

  describe(Business.prototype.name.name, () => {
    it('should return business name', () => {
      // Arrange
      const mockBusiness: BusinessType = {
        id: '1',
        name: 'Test Business',
        phone: '4698761234',
        address: 'San Francisco',
        reviewCount: 10,
        photos: ['https://test.com/image.jpg'],
      }

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.name()).toBe(mockBusiness.name)
    })
  })

  describe(Business.prototype.phone.name, () => {
    it('should return business phone when present', () => {
      // Arrange
      const mockBusiness: BusinessType = {
        id: '1',
        name: 'Test Business',
        phone: '4698761234',
        address: 'San Francisco',
        reviewCount: 10,
        photos: ['https://test.com/image.jpg'],
      }

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.phone()).toBe(mockBusiness.phone)
    })

    it('should return default message when phone is not present', () => {
      // Arrange
      const mockBusiness: BusinessType = {
        id: '1',
        name: 'Test Business',
        phone: '',
        address: 'San Francisco',
        reviewCount: 10,
        photos: ['https://test.com/image.jpg'],
      }

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.phone()).toBe(defaultPhoneMessage)
    })
  })

  describe(Business.prototype.address.name, () => {
    it('should business review count', () => {
      // Arrange
      const mockBusiness: BusinessType = {
        id: '1',
        name: 'Test Business',
        phone: '',
        address: 'San Francisco',
        reviewCount: 10,
        photos: ['https://test.com/image.jpg'],
      }

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.address()).toBe(mockBusiness.address)
    })
  })

  describe(Business.prototype.reviewCount.name, () => {
    it('should business review count', () => {
      // Arrange
      const mockBusiness: BusinessType = {
        id: '1',
        name: 'Test Business',
        phone: '',
        address: 'San Francisco',
        reviewCount: 10,
        photos: ['https://test.com/image.jpg'],
      }

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.reviewCount()).toBe(mockBusiness.reviewCount)
    })
  })

  describe(Business.prototype.imageUrl.name, () => {
    it('should return business image url when present', () => {
      // Arrange
      const mockBusiness: BusinessType = {
        id: '1',
        name: 'Test Business',
        phone: '4698761234',
        address: 'San Francisco',
        reviewCount: 10,
        photos: ['https://test.com/image.jpg'],
      }

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.imageUrl()).toBe(mockBusiness.photos[0])
    })

    it('should return default business image url when it is not present', () => {
      // Arrange
      const mockBusiness: BusinessType = {
        id: '1',
        name: 'Test Business',
        phone: '',
        address: 'San Francisco',
        reviewCount: 10,
        photos: [],
      }

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.imageUrl()).toBe(defaultBusinessImageUrl)
    })
  })
})
