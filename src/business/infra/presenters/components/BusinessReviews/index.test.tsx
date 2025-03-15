import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BusinessReviews from '.'
import { Review } from '../../../../domain/entities/Review'
import { getMockReviewData } from '../../../../domain/entities/mocks/business-review'

describe(BusinessReviews.name, () => {
  it('renders reviews correctly', () => {
    // Arrange
    const mockReviews = [new Review(getMockReviewData())]

    // Act
    render(<BusinessReviews reviews={mockReviews} />)

    // Assert
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.timeCreated())).toBeInTheDocument()
      expect(screen.getByText(review.text())).toBeInTheDocument()
      expect(screen.getByText(review.user().name())).toBeInTheDocument()

      const userImage = screen.getByAltText(review.user().name())

      expect(userImage).toHaveAttribute('src', review.user().profileUrl())
    })
  })
})
