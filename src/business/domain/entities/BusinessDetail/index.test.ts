import { describe, expect, it } from 'vitest'
import { BusinessDetail, BusinessDetailType, HOURS_NOT_PROVIDED, OpeningStatus } from '.'
import { Business } from '../Business'
import { OperatingHour } from '../OperatingHour'
import { Review } from '../Review'
import { getMockBusinessDetailData } from '../mocks/business-detail-data'

describe(BusinessDetail.name, () => {
  describe(BusinessDetail.prototype.business.name, () => {
    it('should return business detail instance when accessed', () => {
      // Arrange
      const mockBusinessDetail: BusinessDetailType = getMockBusinessDetailData()

      // Act
      const result = new BusinessDetail(mockBusinessDetail)

      // Assert
      expect(result.business()).toBeInstanceOf(Business)
    })
  })

  describe(BusinessDetail.prototype.isOpen.name, () => {
    it(`should return ${OpeningStatus.Open} when business is open`, () => {
      // Arrange
      const mockBusinessDetail: BusinessDetailType = getMockBusinessDetailData()

      // Act
      const result = new BusinessDetail(mockBusinessDetail)

      // Assert
      expect(result.isOpen()).toBe(OpeningStatus.Open)
    })

    it(`should return ${OpeningStatus.Closed} when business is closed`, () => {
      // Arrange
      const mockBusinessDetail: BusinessDetailType = getMockBusinessDetailData({ isOpen: false })

      // Act
      const result = new BusinessDetail(mockBusinessDetail)

      // Assert
      expect(result.isOpen()).toBe(OpeningStatus.Closed)
    })

    it('should show default message when operating hours are not provided ', () => {
      // Arrange
      const mockBusinessDetail: BusinessDetailType = getMockBusinessDetailData({ isOpen: null })

      // Act
      const result = new BusinessDetail(mockBusinessDetail)

      // Assert
      expect(result.isOpen()).toBe(HOURS_NOT_PROVIDED)
    })
  })

  describe(BusinessDetail.prototype.hours.name, () => {
    it('should return business hours when accessed', () => {
      // Arrange
      const mockBusinessDetail: BusinessDetailType = getMockBusinessDetailData()

      // Act
      const result = new BusinessDetail(mockBusinessDetail)

      // Assert
      result.hours().forEach((hour) => {
        expect(hour).toBeInstanceOf(OperatingHour)
      })
    })
  })

  describe(BusinessDetail.prototype.reviews.name, () => {
    it('should return business reviews when accessed', () => {
      // Arrange
      const mockBusinessDetail: BusinessDetailType = getMockBusinessDetailData()

      // Act
      const result = new BusinessDetail(mockBusinessDetail)

      // Assert
      result.reviews().forEach((review) => {
        expect(review).toBeInstanceOf(Review)
      })
    })
  })
})
