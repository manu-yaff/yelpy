import { describe, expect, it, vi } from 'vitest'
import { GetBusinessDetailUseCase } from '.'
import { BusinessRepository } from '../../domain/repositories/business'

class MockRepository implements BusinessRepository {
  getBusinessDetail = vi.fn()
  searchByTermAndLocation = vi.fn()
}

describe(GetBusinessDetailUseCase.name, () => {
  describe(GetBusinessDetailUseCase.prototype.execute.name, () => {
    it('should get business detail', async () => {
      // Arrange
      const mockRepository = new MockRepository()

      const getBusinessDetailUseCase = new GetBusinessDetailUseCase(mockRepository)

      const mockGetBusinessDetail = vi.spyOn(mockRepository, 'getBusinessDetail')

      // Act
      await getBusinessDetailUseCase.execute('1')

      // Assert
      expect(mockGetBusinessDetail).toHaveBeenCalledTimes(1)
    })
  })
})
