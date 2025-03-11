import { describe, expect, it } from 'vitest'
import { Review, ReviewType } from '.'
import { User } from '../User'

describe(Review.name, () => {
  describe(Review.prototype.id.name, () => {
    it('should return id', () => {
      // Arrange
      const mockReview: ReviewType = {
        id: '1',
        rating: 5,
        text: 'text review',
        timeCreated: '2024-12-27 14:33:48',
        user: new User({ name: 'Sam', profileUrl: '' }),
      }

      // Act
      const review = new Review(mockReview)

      // Assert
      expect(review.id()).toBe(mockReview.id)
    })
  })

  describe(Review.prototype.rating.name, () => {
    it('should return rating', () => {
      // Arrange
      const mockReview: ReviewType = {
        id: '1',
        rating: 5,
        text: 'text review',
        timeCreated: '2024-12-27 14:33:48',
        user: new User({ name: 'Sam', profileUrl: '' }),
      }

      // Act
      const review = new Review(mockReview)

      // Assert
      expect(review.rating()).toBe(mockReview.rating)
    })
  })

  describe(Review.prototype.text.name, () => {
    it('should return text', () => {
      // Arrange
      const mockReview: ReviewType = {
        id: '1',
        rating: 5,
        text: 'text review',
        timeCreated: '2024-12-27 14:33:48',
        user: new User({ name: 'Sam', profileUrl: '' }),
      }

      // Act
      const review = new Review(mockReview)

      // Assert
      expect(review.text()).toBe(mockReview.text)
    })
  })

  describe(Review.prototype.timeCreated.name, () => {
    it('time created', () => {
      // Arrange
      const mockReview: ReviewType = {
        id: '1',
        rating: 5,
        text: 'text review',
        timeCreated: '2024-12-27 14:33:48',
        user: new User({ name: 'Sam', profileUrl: '' }),
      }

      // Act
      const review = new Review(mockReview)

      // Assert
      expect(review.timeCreated()).toBe('2024-12-27')
    })
  })

  describe(Review.prototype.user.name, () => {
    it('user', () => {
      // Arrange
      const mockReview: ReviewType = {
        id: '1',
        rating: 5,
        text: 'text review',
        timeCreated: '2024-12-27 14:33:48',
        user: new User({ name: 'Sam', profileUrl: '' }),
      }

      // Act
      const review = new Review(mockReview)

      // Assert
      expect(review.user()).toBeInstanceOf(User)
    })
  })
})
