import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import BusinessHours from '.'
import { OperatingHour } from '../../../../domain/entities/OperatingHour'

describe(BusinessHours.name, () => {
  it('should render business hours information', () => {
    // Arrange
    const mockHours = [
      new OperatingHour({
        start: '0900',
        end: '1800',
        day: 1,
      }),
      new OperatingHour({
        start: '1000',
        end: '1700',
        day: 2,
      }),
    ]

    // Act
    render(<BusinessHours hours={mockHours} />)

    // Assert
    expect(screen.getByText('Monday - 09:00 - 18:00')).toBeInTheDocument()
    expect(screen.getByText('Tuesday - 10:00 - 17:00')).toBeInTheDocument()
  })
})
