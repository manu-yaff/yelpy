import { describe, expect, it } from 'vitest'
import { SearchByTermAndLocationUseCase } from '.'
import { getMockBusinessRepository } from '../../domain/repositories/business/mocks'

describe(SearchByTermAndLocationUseCase.name, () => {
  describe(SearchByTermAndLocationUseCase.prototype.execute.name, () => {
    it('should search by term and location', async () => {
      // Arrange
      const mockRepository = getMockBusinessRepository()
      const searchByTermAndLocation = new SearchByTermAndLocationUseCase(mockRepository)

      // Act
      await searchByTermAndLocation.execute('term', 'location')

      // Assert
      expect(mockRepository.searchByTermAndLocation).toHaveBeenCalledTimes(1)
    })
  })
})
