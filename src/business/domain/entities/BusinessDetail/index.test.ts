import { describe, expect, it } from 'vitest'
import { BusinessDetail, HOURS_NOT_PROVIDED, OpeningStatus } from '.'
import { Business } from '../Business'
import { OperatingHour } from '../OperatingHour'
import { Review } from '../Review'
import { User } from '../User'
import { getMockBusinessData } from '../mocks/business-data'

describe(BusinessDetail.name, () => {
  describe(BusinessDetail.prototype.business.name, () => {
    it('should return business detail instance when passing valid params', () => {
      // Arrange
      const mockBusiness = new Business(getMockBusinessData())

      // Act
      const result = new BusinessDetail({
        business: mockBusiness,
        isOpen: true,
        hours: [],
        reviews: [],
      })

      // Assert
      expect(result.business()).toBeInstanceOf(Business)
    })
  })

  describe(BusinessDetail.prototype.isOpen.name, () => {
    it(`should return ${OpeningStatus.Open} when business is open`, () => {
      // Arrange
      const mockBusiness = new Business(getMockBusinessData())

      // Act
      const result = new BusinessDetail({
        business: mockBusiness,
        isOpen: true,
        hours: [],
        reviews: [],
      })

      // Assert
      expect(result.isOpen()).toBe(OpeningStatus.Open)
    })

    it(`should return ${OpeningStatus.Closed} when business is closed`, () => {
      // Arrange
      const mockBusiness = new Business(getMockBusinessData())

      // Act
      const result = new BusinessDetail({
        business: mockBusiness,
        isOpen: false,
        hours: [],
        reviews: [],
      })

      // Assert
      expect(result.isOpen()).toBe(OpeningStatus.Closed)
    })

    it('should show default message when operating hours are not provided ', () => {
      // Arrange
      const mockBusiness = new Business(getMockBusinessData())

      // Act
      const result = new BusinessDetail({
        business: mockBusiness,
        isOpen: null,
        hours: [],
        reviews: [],
      })

      // Assert
      expect(result.isOpen()).toBe(HOURS_NOT_PROVIDED)
    })
  })

  describe(BusinessDetail.prototype.hours.name, () => {
    it('should return business hours when business provides them', () => {
      // Arrange
      const mockBusiness = new Business(getMockBusinessData())

      // Act
      const result = new BusinessDetail({
        business: mockBusiness,
        isOpen: true,
        hours: [
          new OperatingHour({
            start: '0800',
            end: '1700',
            day: 1,
          }),
        ],
        reviews: [],
      })

      // Assert
      result.hours().forEach((hour) => {
        expect(hour).toBeInstanceOf(OperatingHour)
      })
    })
  })

  describe(BusinessDetail.prototype.reviews.name, () => {
    it('should return business hours ', () => {
      // Arrange
      const mockBusiness = new Business(getMockBusinessData())

      // Act
      const result = new BusinessDetail({
        business: mockBusiness,
        isOpen: true,
        hours: [],
        reviews: [
          new Review({
            id: '1',
            rating: 5,
            text: 'text review',
            timeCreated: '2024-12-27 14:33:48',
            user: new User({ name: 'Sam', profileUrl: '' }),
          }),
        ],
      })

      // Assert
      result.reviews().forEach((review) => {
        expect(review).toBeInstanceOf(Review)
      })
    })
  })
})
