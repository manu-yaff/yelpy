import { describe, expect, it, vi } from 'vitest'
import { BusinessRepository } from '../domain/repositories/business-repository'
import { SearchByTermAndLocationUseCase } from './search-by-term-and-location'

class MockRepository implements BusinessRepository {
  searchByTermAndLocation = vi.fn()
}

describe(SearchByTermAndLocationUseCase.name, () => {
  describe(SearchByTermAndLocationUseCase.prototype.execute, () => {
    it('should search by term and location', async () => {
      const mockRepository = new MockRepository()
      const useCase = new SearchByTermAndLocationUseCase(mockRepository)
      const spy = vi.spyOn(mockRepository, 'searchByTermAndLocation')

      await useCase.execute('term', 'location')

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})
