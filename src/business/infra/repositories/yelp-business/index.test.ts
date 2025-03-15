import { describe, expect, it, vi } from 'vitest'
import { BusinessNotFoundError, UnexpectedError, YelpGraphqlError, YelpGraphqlRepository } from '.'
import { Business } from '../../../domain/entities/Business'
import { BusinessDetail } from '../../../domain/entities/BusinessDetail'
import { BUSINESS_DETAIL_QUERY } from '../graphql-queries/business-detail-query'
import { SEARCH_BUSINESS_QUERY } from '../graphql-queries/search-business-query'
import {
  mockBusinessDetailResponse,
  mockBusinessNotFound,
  mockBusinessResponse,
  mockYelpApiConfig,
} from '../mocks/yelp-api-response'

describe(YelpGraphqlRepository.name, () => {
  describe(YelpGraphqlRepository.prototype.searchByTermAndLocation.name, () => {
    it('should throw an error when there is a network error', async () => {
      // Arrange
      const mockSearchTerm = 'tacos'
      const mockLocation = 'san francisco'

      const mockFetch = vi.fn().mockRejectedValue(new Error('Timeout error'))

      const repository = new YelpGraphqlRepository(mockFetch, mockYelpApiConfig)

      // Act
      const promise = repository.searchByTermAndLocation(mockSearchTerm, mockLocation)

      // Assert
      expect(mockFetch).toHaveBeenCalledTimes(1)

      await expect(promise).rejects.toThrowError(UnexpectedError)
    })

    it('should throw an error when there is a error with graphql', async () => {
      // Arrange
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      })

      const repository = new YelpGraphqlRepository(mockFetch, mockYelpApiConfig)

      // Act
      const promise = repository.searchByTermAndLocation('tacos', 'san francisco')

      // Assert
      expect(mockFetch).toHaveBeenCalledTimes(1)

      await expect(promise).rejects.toThrowError(YelpGraphqlError)
    })

    it('should send graphql request', async () => {
      // Arrange
      const mockSearchTerm = 'tacos'
      const mockLocation = 'san francisco'

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockBusinessResponse),
      }

      const mockFetch = vi.fn().mockResolvedValue(mockResponse)

      const repository = new YelpGraphqlRepository(mockFetch, mockYelpApiConfig)

      // Act
      await repository.searchByTermAndLocation(mockSearchTerm, mockLocation)

      // Assert
      expect(mockFetch).toBeCalledWith(mockYelpApiConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: SEARCH_BUSINESS_QUERY,
          variables: { searchTerm: mockSearchTerm, location: mockLocation },
        }),
      })
    })

    it('should return business entity object', async () => {
      // Arrange
      const mockSearchTerm = 'tacos'
      const mockLocation = 'san francisco'

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockBusinessResponse),
      }

      const mockFetch = vi.fn().mockResolvedValue(mockResponse)

      const repository = new YelpGraphqlRepository(mockFetch, mockYelpApiConfig)

      // Act
      const result = await repository.searchByTermAndLocation(mockSearchTerm, mockLocation)

      // Assert
      expect(result).toBeInstanceOf(Array<Business>)
    })
  })

  describe(YelpGraphqlRepository.prototype.getBusinessDetail.name, () => {
    it('should throw an error when there is a network error', async () => {
      // Arrange
      const mockId = 'M2Iqqe13-n7_60q9ND0vM0'

      const mockFetch = vi.fn().mockRejectedValue(new Error('Invalid header name'))

      const repository = new YelpGraphqlRepository(mockFetch, mockYelpApiConfig)

      // Act
      const promise = repository.getBusinessDetail(mockId)

      // Assert
      await expect(promise).rejects.toThrow(UnexpectedError)
    })

    it('should throw an error when there is a error with graphql', async () => {
      // Arrange
      const mockBusinessId = 'M2Iqqe13-n7_60q9ND0vM0'

      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
      })

      const repository = new YelpGraphqlRepository(mockFetch, mockYelpApiConfig)

      // Act
      const promise = repository.getBusinessDetail(mockBusinessId)

      // Assert
      await expect(promise).rejects.toThrow(YelpGraphqlError)
    })

    it('should send graphql request', async () => {
      // Arrange
      const mockBusinessId = 'M2Iqqe13-n7_60q9ND0vM0'
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockBusinessDetailResponse),
      })

      const repository = new YelpGraphqlRepository(mockFetch, mockYelpApiConfig)

      // Act
      await repository.getBusinessDetail(mockBusinessId)

      // Assert
      expect(mockFetch).toHaveBeenCalledWith(mockYelpApiConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: BUSINESS_DETAIL_QUERY,
          variables: { id: mockBusinessId },
        }),
      })
    })

    it('should return business detail entity', async () => {
      // Arrange
      const mockBusinessId = 'M2Iqqe13-n7_60q9ND0vM0'

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockBusinessDetailResponse),
      })

      const repository = new YelpGraphqlRepository(mockFetch, mockYelpApiConfig)

      // Act
      const result = await repository.getBusinessDetail(mockBusinessId)

      // Assert
      expect(result).toBeInstanceOf(BusinessDetail)
    })

    it('should throw error when the business is not found', async () => {
      // Arrange
      const mockBusinessId = '1'

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockBusinessNotFound),
      })

      const repository = new YelpGraphqlRepository(mockFetch, mockYelpApiConfig)

      // Act
      const promise = repository.getBusinessDetail(mockBusinessId)

      // Assert
      await expect(promise).rejects.toThrow(BusinessNotFoundError)
    })
  })
})
