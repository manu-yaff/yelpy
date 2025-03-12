import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import BusinessCard from '.'
import { Business } from '../../../../domain/entities/Business'

describe(BusinessCard.name, () => {
  const mockBusiness = {
    id: () => '123',
    name: () => 'Test Business',
    phone: () => '123-456-7890',
    address: () => '123 Test St',
    reviewCount: () => 42,
    imageUrl: () => 'https://example.com/image.jpg',
  } as unknown as Business

  it('renders business information correctly', () => {
    // Arrange

    // Act
    render(<BusinessCard business={mockBusiness} shouldRedirectToDetailPage={false} />, {
      wrapper: MemoryRouter,
    })

    // Assert
    expect(screen.getByText('Business information')).toBeInTheDocument()
    expect(screen.getByText('Test Business')).toBeInTheDocument()
    expect(screen.getByText('123-456-7890')).toBeInTheDocument()
    expect(screen.getByText('123 Test St')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('https://example.com/image.jpg')).toBeInTheDocument()
  })

  it('renders business info inside a link when shouldRedirectToDetailPage is true', () => {
    // Arrange

    // Act
    render(<BusinessCard business={mockBusiness} shouldRedirectToDetailPage={true} />, {
      wrapper: MemoryRouter,
    })

    // Assert
    const linkElement = screen.getByRole('link', { name: /Test Business/i })
    expect(linkElement).toHaveAttribute('href', '/business/123/detail')
  })

  it('does not render a link when shouldRedirectToDetailPage is false', () => {
    // Arrange

    // Act
    render(<BusinessCard business={mockBusiness} shouldRedirectToDetailPage={false} />, {
      wrapper: MemoryRouter,
    })

    // Act
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
