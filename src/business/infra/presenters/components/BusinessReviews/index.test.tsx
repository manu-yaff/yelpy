import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BusinessReviews from '.'
import { Review } from '../../../../domain/entities/Review'
import { User } from '../../../../domain/entities/User'

describe(BusinessReviews.name, () => {
  it('renders reviews correctly', () => {
    // Arrange
    const mockReviews = [
      new Review({
        id: '1',
        timeCreated: '2024-03-12',
        rating: 5,
        text: 'Test Review',
        user: new User({
          name: 'John Doe',
          profileUrl: 'https://example.com/johndoe',
        }),
      }),
    ]

    // Act
    render(<BusinessReviews reviews={mockReviews} />)

    // Assert
    expect(screen.getByText('2024-03-12')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('Test Review')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('https://example.com/johndoe')).toBeInTheDocument()
  })
})
