import { Business } from '../../domain/entities/business'
import { BusinessRepository } from '../../domain/repositories/business-repository'
import { businessFromApiToBusinessEntity } from '../adapters/business-from-yelp-to-entity'
import { searchBusinessQuery } from '../graphql-queries/search-business-query'
import { YelpSearchBusinessResponse } from './yelp-business-repository.types'

const apiHost = import.meta.env.VITE_YELP_API_HOST

export const NetworkError = 'Error sending the request'
export const GraphqlError = 'Graphql error'

export type Fetch = typeof fetch

export class YelpGraphqlRepository implements BusinessRepository {
  private fetchFn: Fetch

  constructor(fetchFn: Fetch) {
    this.fetchFn = fetchFn.bind(globalThis)
  }

  async searchByTermAndLocation(searchTerm: string, location: string): Promise<Array<Business>> {
    const response = await this.fetchFn(apiHost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchBusinessQuery,
        variables: {
          searchTerm,
          location,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(GraphqlError)
    }

    const { data } = (await response.json()) as YelpSearchBusinessResponse

    return data.search.business.map(businessFromApiToBusinessEntity)
  }
}
