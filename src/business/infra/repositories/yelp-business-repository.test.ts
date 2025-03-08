import { describe, expect, it, vi } from 'vitest'
import { businessFromApiToBusinessEntity } from '../adapters/business-from-yelp-to-entity'
import { GraphqlError, YelpGraphqlRepository } from './yelp-business-repository'
import { YelpSearchBusinessResponse } from './yelp-business-repository.types'

vi.mock('../adapters/business-from-yelp-to-entity', () => ({
  businessFromApiToBusinessEntity: vi.fn(),
}))

describe(YelpGraphqlRepository.name, () => {
  it('should throw an error when there a network error', async () => {
    const spy = vi.fn()

    spy.mockRejectedValue(new Error('random error'))

    const repository = new YelpGraphqlRepository(spy)

    await expect(async () => {
      await repository.searchByTermAndLocation('tacos', 'san francisco')
    }).rejects.toThrowError('random error')

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should throw an error when there is a error with graphql', async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      statusText: 'Bad Request',
    }

    const fetchMock = vi.fn().mockResolvedValue(mockResponse)

    const repository = new YelpGraphqlRepository(fetchMock)

    await expect(async () => {
      await repository.searchByTermAndLocation('tacos', 'san francisco')
    }).rejects.toThrowError(GraphqlError)
  })

  it('should return business search result', async () => {
    const mockBusinessResponse: YelpSearchBusinessResponse = {
      data: {
        search: {
          business: [
            {
              id: '1',
              name: 'Test Business',
              display_phone: '1234567890',
              photos: ['https://test.com/image.jpg'],
              review_count: 10,
              location: {
                formatted_address: 'San Francisco',
              },
            },
          ],
        },
      },
    }

    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockBusinessResponse),
    }

    const fetchMock = vi.fn().mockResolvedValue(mockResponse)

    const repository = new YelpGraphqlRepository(fetchMock)

    await repository.searchByTermAndLocation('tacos', 'san francisco')

    expect(businessFromApiToBusinessEntity).toHaveBeenCalledTimes(1)
  })
})
