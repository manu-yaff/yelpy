import { describe, expect, it } from 'vitest'
import { OperatingHour, OperatingHourType } from '.'

describe(OperatingHour.name, () => {
  describe(OperatingHour.prototype.formatted.name, () => {
    it('should format hour object', () => {
      // Arrange
      const mockHour: OperatingHourType = {
        start: '0800',
        end: '1700',
        day: 1,
      }

      // Act
      const hour = new OperatingHour(mockHour)

      // Assert
      expect(hour.formatted()).toEqual('Monday - 08:00 - 17:00')
    })
  })
})
