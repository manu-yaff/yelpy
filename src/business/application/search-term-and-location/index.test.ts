import { describe, expect, it, vi } from 'vitest'
import { SearchByTermAndLocationUseCase } from '.'
import { BusinessRepository } from '../../domain/repositories/business'

class MockRepository implements BusinessRepository {
  searchByTermAndLocation = vi.fn()
}

describe(SearchByTermAndLocationUseCase.name, () => {
  describe(SearchByTermAndLocationUseCase.prototype.execute, () => {
    it('should search by term and location', async () => {
      // Arrange
      const mockRepository = new MockRepository()

      const searchByTermAndLocation = new SearchByTermAndLocationUseCase(mockRepository)

      const mockSearchByTermAndLocation = vi.spyOn(mockRepository, 'searchByTermAndLocation')

      // Act
      await searchByTermAndLocation.execute('term', 'location')

      // Assert
      expect(mockSearchByTermAndLocation).toHaveBeenCalledTimes(1)
    })
  })
})
