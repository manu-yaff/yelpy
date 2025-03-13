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
      const businessImage = screen.getByAltText(mockBusinessData.business().name())

      expect(screen.getByText(mockBusinessData.business().name())).toBeInTheDocument()
      expect(screen.getByText(mockBusinessData.business().phone())).toBeInTheDocument()
      expect(screen.getByText(mockBusinessData.business().address())).toBeInTheDocument()
      expect(
        screen.getByText(mockBusinessData.business().reviewCount() + ' reviews')
      ).toBeInTheDocument()
      expect(businessImage).toHaveAttribute('src', mockBusinessData.business().imageUrl())

      mockBusinessData.hours().forEach((hour) => {
        expect(screen.getByText(hour.formatted())).toBeInTheDocument()
      })

      mockBusinessData.reviews().forEach((review) => {
        const userImage = screen.getByAltText(review.user().name())

        expect(screen.getByText(review.timeCreated())).toBeInTheDocument()
        expect(screen.getByText(review.rating())).toBeInTheDocument()
        expect(screen.getByText(review.text())).toBeInTheDocument()
        expect(screen.getByText(review.user().name())).toBeInTheDocument()

        expect(userImage).toHaveAttribute('src', review.user().profileUrl())
      })
    })
  })
})
