import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import BusinessDetailPage from '.'
import { GetBusinessDetailUseCase } from '../../../../application/get-business-detail'
import { BusinessDetail } from '../../../../domain/entities/BusinessDetail'
import { getMockBusinessDetailData } from '../../../../domain/entities/mocks/business-detail-data'

vi.mock('../../useCases/GetBusinessDetailUseCase')

describe(BusinessDetailPage.name, () => {
  it('renders error message when API call fails', async () => {
    // Arrange
    const mockError = new Error('failed to fetch')
    vi.spyOn(GetBusinessDetailUseCase.prototype, 'execute').mockRejectedValue(mockError)

    // Act
    render(
      <MemoryRouter initialEntries={['/business/123']}>
        <Routes>
          <Route path="/business/:id" element={<BusinessDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    // Assert
    await waitFor(() => expect(screen.getByText(`Error: ${mockError.message}`)).toBeInTheDocument())
  })

  it('renders business details when API call is successful', async () => {
    // Arrange
    const mockBusinessData: BusinessDetail = new BusinessDetail(getMockBusinessDetailData())
    vi.spyOn(GetBusinessDetailUseCase.prototype, 'execute').mockResolvedValue(mockBusinessData)

    // Act
    render(
      <MemoryRouter initialEntries={['/business/123']}>
        <Routes>
          <Route path="/business/:id" element={<BusinessDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    // Assert
    await waitFor(() => {
      const businessImageHtmlElement = screen.getByAltText(mockBusinessData.business().name())

      const business = mockBusinessData.business()
      const hours = mockBusinessData.hours()
      const reviews = mockBusinessData.reviews()
      const isOpen = mockBusinessData.isOpen()

      expect(screen.getByText(business.name())).toBeInTheDocument()
      expect(screen.getByText(business.phone())).toBeInTheDocument()
      expect(screen.getByText(business.address())).toBeInTheDocument()
      expect(screen.getByText(business.reviewCount() + ' reviews')).toBeInTheDocument()
      expect(businessImageHtmlElement).toHaveAttribute('src', business.imageUrl())

      expect(screen.getByText(isOpen)).toBeInTheDocument()

      hours.forEach((hour) => {
        expect(screen.getByText(hour.formatted())).toBeInTheDocument()
      })

      reviews.forEach((review) => {
        const userImageHtmlElement = screen.getByAltText(review.user().name())

        expect(screen.getByText(review.timeCreated())).toBeInTheDocument()

        expect(screen.getByText(review.text())).toBeInTheDocument()
        expect(screen.getByText(review.user().name())).toBeInTheDocument()

        expect(userImageHtmlElement).toHaveAttribute('src', review.user().profileUrl())
      })
    })
  })
})
