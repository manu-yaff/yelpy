import { describe, expect, it } from 'vitest'
import { Business, BusinessType, DEFAULT_BUSINESS_IMAGE_URL, PHONE_NOT_PROVIDED } from '.'
import { getMockBusinessData } from '../mocks/business-data'

describe(Business.name, () => {
  describe(Business.prototype.id.name, () => {
    it('should return the correct business id when accessed', () => {
      // Arrange
      const mockBusiness: BusinessType = getMockBusinessData()

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.id()).toBe(mockBusiness.id)
    })
  })

  describe(Business.prototype.name.name, () => {
    it('should return the correct business named when accessed', () => {
      // Arrange
      const mockBusiness: BusinessType = getMockBusinessData()

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.name()).toBe(mockBusiness.name)
    })
  })

  describe(Business.prototype.phone.name, () => {
    it('should return business phone number when it has one', () => {
      // Arrange
      const mockBusiness: BusinessType = getMockBusinessData()

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.phone()).toBe(mockBusiness.phone)
    })

    it('should return default message when business does not provide a phone number', () => {
      // Arrange
      const mockBusiness: BusinessType = getMockBusinessData({ phone: '' })

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.phone()).toBe(PHONE_NOT_PROVIDED)
    })
  })

  describe(Business.prototype.address.name, () => {
    it('should return business address when accessed', () => {
      // Arrange
      const mockBusiness: BusinessType = getMockBusinessData()

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.address()).toBe(mockBusiness.address)
    })
  })

  describe(Business.prototype.reviewCount.name, () => {
    it('should return business review count when accessed', () => {
      // Arrange
      const mockBusiness: BusinessType = getMockBusinessData()

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.reviewCount()).toBe(mockBusiness.reviewCount)
    })
  })

  describe(Business.prototype.imageUrl.name, () => {
    it('should return business image url when it has one', () => {
      // Arrange
      const mockBusiness: BusinessType = getMockBusinessData()

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.imageUrl()).toBe(mockBusiness.photos[0])
    })

    it('shold return default image url when business does not provide one', () => {
      // Arrange
      const mockBusiness: BusinessType = getMockBusinessData({ photos: [] })

      // Act
      const result = new Business(mockBusiness)

      // Assert
      expect(result.imageUrl()).toBe(DEFAULT_BUSINESS_IMAGE_URL)
    })
  })
})
