import { describe, expect, it, vi } from 'vitest'
import { businessDetailFromApiToBusinessDetailEntity } from '../adapters/business-detail-from-yelp-to-entity'
import { businessFromApiToBusinessEntity } from '../adapters/business-from-yelp-to-entity'
import {
  GraphqlError,
  UnexpectedError,
  YelpGraphqlError,
  YelpGraphqlRepository,
} from './yelp-business-repository'
import {
  BusinessDetailFromYelp,
  YelpBusinessDetailResponse,
  YelpSearchBusinessResponse,
} from './yelp-business-repository.types'
import { mockBusinessResponse, mockYelpApiConfig } from './mocks/yelp-api-response'
import { searchBusinessQuery } from './graphql-queries/search-business-query'
import { Business } from '../../domain/entities/Business'

vi.mock('../adapters/business-from-yelp-to-entity', () => ({
  businessFromApiToBusinessEntity: vi.fn(),
}))

vi.mock('../adapters/business-detail-from-yelp-to-entity', () => ({
  businessDetailFromApiToBusinessDetailEntity: vi.fn(),
}))

describe(YelpGraphqlRepository.name, () => {
  describe(YelpGraphqlRepository.prototype.searchByTermAndLocation.name, () => {
    it('should throw an error when there is a network error', async () => {
      // Arrange
      const searchTerm = 'tacos'
      const location = 'san francisco'

      const mockFetch = vi.fn().mockRejectedValue(new Error('Timeout error'))

      const repository = new YelpGraphqlRepository(mockFetch, mockYelpApiConfig)

      // Act
      const promise = repository.searchByTermAndLocation(searchTerm, location)

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
      const searchTerm = 'tacos'
      const location = 'san francisco'

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockBusinessResponse),
      }

      const mockFetch = vi.fn().mockResolvedValue(mockResponse)

      const repository = new YelpGraphqlRepository(mockFetch, mockYelpApiConfig)

      // Act
      await repository.searchByTermAndLocation(searchTerm, location)

      // Assert
      expect(mockFetch).toBeCalledWith(mockYelpApiConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchBusinessQuery,
          variables: { searchTerm, location },
        }),
      })
    })

    it('should return business entity object', async () => {
      // Arrange
      const searchTerm = 'tacos'
      const location = 'san francisco'

      const mockResponse = {
        ok: true,
        json: vi.fn().mockResolvedValue(mockBusinessResponse),
      }

      const mockFetch = vi.fn().mockResolvedValue(mockResponse)

      const repository = new YelpGraphqlRepository(mockFetch, mockYelpApiConfig)

      // Act
      const result = await repository.searchByTermAndLocation(searchTerm, location)

      // Assert
      expect(result).toBeInstanceOf(Array<Business>)
    })
  })

  describe.skip(YelpGraphqlRepository.prototype.getBusinessDetail.name, () => {
    it('should throw an error when there is a network error', async () => {
      const mockFetch = vi.fn()
      const mockId = 'test-id'
      mockFetch.mockRejectedValue(new Error('Connection refused error'))

      const repository = new YelpGraphqlRepository(mockFetch)

      await expect(async () => {
        await repository.getBusinessDetail(mockId)
      }).rejects.toThrow('Connection refused error')
    })

    it('should throw an error when there is a error with graphql', async () => {
      const mockBusinessId = '1'
      const mockFetch = vi.fn()

      mockFetch.mockResolvedValue({
        ok: false,
        status: 409,
      })

      const repository = new YelpGraphqlRepository(mockFetch)

      await expect(async () => {
        await repository.getBusinessDetail(mockBusinessId)
      }).rejects.toThrowError(GraphqlError)
    })

    it('should return business detail', async () => {
      const mockBusinessDetail: BusinessDetailFromYelp = {
        id: '1',
        name: 'Test Business',
        display_phone: '1234567890',
        photos: ['https://test.com/image.jpg'],
        review_count: 10,
        location: {
          formatted_address: 'San Francisco',
        },
        hours: [
          {
            start: '0000',
            end: '0000',
            day: 1,
          },
        ],
        reviews: [
          {
            id: '1',
            rating: 10,
            text: 'Test review',
            time_created: '2024-09-24 04:05:22',
            user: {
              profile_url: 'https://example.com/image.jpg',
              name: 'Test name',
            },
          },
        ],
      }

      const mockBusinessDetailResponse: YelpBusinessDetailResponse = {
        data: {
          business: mockBusinessDetail,
        },
      }

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(mockBusinessDetailResponse),
      })

      const repository = new YelpGraphqlRepository(mockFetch)

      await repository.getBusinessDetail('1')

      expect(businessDetailFromApiToBusinessDetailEntity).toHaveBeenCalledTimes(1)
    })
  })
})
