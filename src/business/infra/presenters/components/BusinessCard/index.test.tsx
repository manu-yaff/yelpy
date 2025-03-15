import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import BusinessCard from '.'
import { Business } from '../../../../domain/entities/Business'
import { getMockBusinessData } from '../../../../domain/entities/mocks/business-data'

describe(BusinessCard.name, () => {
  it('should show business information when rendering component', () => {
    // Arrange
    const mockBusiness: Business = new Business(getMockBusinessData())

    // Act
    render(<BusinessCard business={mockBusiness} shouldRedirectToDetailPage={false} />, {
      wrapper: MemoryRouter,
    })

    // Assert
    expect(screen.getByText(mockBusiness.name())).toBeInTheDocument()
    expect(screen.getByText(mockBusiness.phone())).toBeInTheDocument()
    expect(screen.getByText(mockBusiness.address())).toBeInTheDocument()
    expect(screen.getByText(mockBusiness.reviewCount() + ' reviews')).toBeInTheDocument()

    const imageUrl = screen.getByAltText(mockBusiness.name())
    expect(imageUrl).toHaveAttribute('src', mockBusiness.imageUrl())
  })

  it('should render business infro info inside a link when shouldRedirectToDetailPage is true', () => {
    // Arrange
    const mockBusiness: Business = new Business(getMockBusinessData())
    const businessDetailLink = `/business/${mockBusiness.id()}/detail`

    // Act
    render(<BusinessCard business={mockBusiness} shouldRedirectToDetailPage={true} />, {
      wrapper: MemoryRouter,
    })

    // Assert
    const linkElement = screen.getByRole('link', { name: /Test Business/i })
    expect(linkElement).toHaveAttribute('href', businessDetailLink)
  })

  it('does not render a link when shouldRedirectToDetailPage is false', () => {
    // Arrange
    const mockBusiness: Business = new Business(getMockBusinessData())

    // Act
    render(<BusinessCard business={mockBusiness} shouldRedirectToDetailPage={false} />, {
      wrapper: MemoryRouter,
    })

    // Act
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
