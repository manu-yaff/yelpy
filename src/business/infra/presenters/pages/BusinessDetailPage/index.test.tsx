import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import BusinessDetailPage from '.'
import { GetBusinessDetailUseCase } from '../../../../application/get-business-detail'
import { Business } from '../../../../domain/entities/Business'
import { BusinessDetail } from '../../../../domain/entities/BusinessDetail'
import { OperatingHour } from '../../../../domain/entities/OperatingHour'
import { Review } from '../../../../domain/entities/Review'
import { User } from '../../../../domain/entities/User'

vi.mock('../../useCases/GetBusinessDetailUseCase')

describe(BusinessDetailPage.name, () => {
  const mockBusinessData: BusinessDetail = new BusinessDetail({
    business: new Business({
      id: '123',
      name: 'Test Business',
      phone: '123-456-7890',
      address: '123 Test St',
      reviewCount: 42,
      photos: ['https://example.com/image.jpg'],
    }),
    isOpen: true,
    hours: [new OperatingHour({ start: '0900', end: '1800', day: 1 })],
    reviews: [
      new Review({
        id: '1',
        timeCreated: '2024-03-12',
        rating: 5,
        text: 'Great service!',
        user: new User({
          name: 'John Doe',
          profileUrl: 'https://example.com/johndoe',
        }),
      }),
    ],
  })

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
      expect(screen.getByText('Business info')).toBeInTheDocument()
      expect(screen.getByText('Test Business')).toBeInTheDocument()
      expect(screen.getByText('123-456-7890')).toBeInTheDocument()
      expect(screen.getByText('123 Test St')).toBeInTheDocument()
      expect(screen.getByText('42')).toBeInTheDocument()
      expect(screen.getByText('https://example.com/image.jpg')).toBeInTheDocument()

      expect(screen.getByText('Hours')).toBeInTheDocument()
      expect(screen.getByText('Monday 09:00 - 18:00')).toBeInTheDocument()

      expect(screen.getByText('Reviews')).toBeInTheDocument()
      expect(screen.getByText('Great service!')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })
})
