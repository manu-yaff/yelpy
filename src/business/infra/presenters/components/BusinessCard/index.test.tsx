import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import BusinessCard from '.'
import { Business } from '../../../../domain/entities/Business'
import { getMockBusinessData } from '../../../../domain/entities/mocks/business-data'

describe(BusinessCard.name, () => {
  const mockBusiness: Business = new Business(getMockBusinessData())

  it('should show business information when rendering component', () => {
    // Arrange

    // Act
    render(<BusinessCard business={mockBusiness} shouldRedirectToDetailPage={false} />, {
      wrapper: MemoryRouter,
    })

    // Assert
    expect(screen.getByText('Business information')).toBeInTheDocument()
    expect(screen.getByText(mockBusiness.name())).toBeInTheDocument()
    expect(screen.getByText(mockBusiness.phone())).toBeInTheDocument()
    expect(screen.getByText(mockBusiness.address())).toBeInTheDocument()
    expect(screen.getByText(mockBusiness.reviewCount())).toBeInTheDocument()
    expect(screen.getByText(mockBusiness.imageUrl())).toBeInTheDocument()
  })

  it('should render business infro info inside a link when shouldRedirectToDetailPage is true', () => {
    // Arrange

    // Act
    render(<BusinessCard business={mockBusiness} shouldRedirectToDetailPage={true} />, {
      wrapper: MemoryRouter,
    })

    // Assert
    const linkElement = screen.getByRole('link', { name: /Test Business/i })
    expect(linkElement).toHaveAttribute('href', `/business/${mockBusiness.id()}/detail`)
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
