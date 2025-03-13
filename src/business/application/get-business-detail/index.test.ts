import { describe, expect, it } from 'vitest'
import { GetBusinessDetailUseCase } from '.'
import { getMockBusinessRepository } from '../../domain/repositories/business/mocks'

describe(GetBusinessDetailUseCase.name, () => {
  describe(GetBusinessDetailUseCase.prototype.execute.name, () => {
    it('should get business detail', async () => {
      // Arrange
      const mockRepository = getMockBusinessRepository()
      const getBusinessDetailUseCase = new GetBusinessDetailUseCase(mockRepository)

      // Act
      await getBusinessDetailUseCase.execute('1')

      // Assert
      expect(mockRepository.getBusinessDetail).toHaveBeenCalledTimes(1)
    })
  })
})
