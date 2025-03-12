import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import BusinessSearchPage from '.'
import { SearchByTermAndLocationUseCase } from '../../../../application/search-term-and-location'
import { Business } from '../../../../domain/entities/Business'

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...(actual as object),
    useSearchParams: vi
      .fn()
      .mockReturnValue([new URLSearchParams({ term: 'tacos', location: 'san francisco' })]),
  }
})

describe(BusinessSearchPage.name, () => {
  it('should render data', async () => {
    const mockBusiness = new Business({
      id: '1',
      name: 'Test Business',
      phone: '123456789',
      address: 'Test address',
      reviewCount: 10,
      photos: ['https://example.com/image.jpg'],
    })

    vi.spyOn(SearchByTermAndLocationUseCase.prototype, 'execute').mockResolvedValue([mockBusiness])

    render(
      <MemoryRouter>
        <BusinessSearchPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Results from the search/i)).toBeInTheDocument()

      expect(screen.getByText(mockBusiness.name())).toBeInTheDocument()
      expect(screen.getByText(mockBusiness.phone())).toBeInTheDocument()
      expect(screen.getByText(mockBusiness.address())).toBeInTheDocument()
      expect(screen.getByText(mockBusiness.reviewCount())).toBeInTheDocument()
      expect(screen.getByText(mockBusiness.imageUrl())).toBeInTheDocument()
    })
  })

  it.skip('should render business information', async () => {
    const mockError = 'Graphql error'

    vi.spyOn(SearchByTermAndLocationUseCase.prototype, 'execute').mockRejectedValue(
      new Error(mockError)
    )

    render(
      <MemoryRouter>
        <BusinessSearchPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(`Error: ${mockError}`)).toBeInTheDocument()
    })
  })
})
