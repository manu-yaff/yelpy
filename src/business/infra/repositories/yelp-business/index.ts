import { Business } from '../../../domain/entities/Business'
import { BusinessDetail } from '../../../domain/entities/BusinessDetail'
import { BusinessRepository } from '../../../domain/repositories/business'
import { BusinessDetailMapper } from '../../adapters/business-detail-from-yelp-to-entity'
import { BusinessMapper } from '../../adapters/business-from-yelp-to-entity'
import { BUSINESS_DETAIL_QUERY } from '../graphql-queries/business-detail-query'
import { SEARCH_BUSINESS_QUERY } from '../graphql-queries/search-business-query'
import { YelpBusinessDetailResponse, YelpSearchBusinessResponse } from './types'

export type Fetch = typeof fetch

export type YelpGraphqlApiConfig = {
  apiUrl: string
}

export class UnexpectedError extends Error {
  constructor() {
    super('Unxepected error')
  }
}

export class YelpGraphqlError extends Error {
  constructor() {
    super('Yelp graphql error')
  }
}

export class YelpGraphqlRepository implements BusinessRepository {
  private fetchFn: Fetch
  private apiConfig: YelpGraphqlApiConfig

  constructor(fetchFn: Fetch, graphqlApiConfig: YelpGraphqlApiConfig) {
    this.fetchFn = fetchFn.bind(globalThis)
    this.apiConfig = graphqlApiConfig
  }

  async searchByTermAndLocation(searchTerm: string, location: string): Promise<Array<Business>> {
    const response = await this.sendGraphqlRequest(SEARCH_BUSINESS_QUERY, { searchTerm, location })

    const { data } = (await response.json()) as YelpSearchBusinessResponse

    return data.search.business.map(BusinessMapper.fromYelp)
  }

  async getBusinessDetail(id: string): Promise<BusinessDetail> {
    const response = await this.sendGraphqlRequest(BUSINESS_DETAIL_QUERY, { id })

    const { data } = (await response.json()) as YelpBusinessDetailResponse

    return BusinessDetailMapper.fromYelp(data.business)
  }

  private async sendGraphqlRequest(
    query: string,
    variables: Record<string, unknown>
  ): Promise<Response> {
    try {
      const response = await this.fetchFn(this.apiConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      })

      if (!response.ok) {
        throw new YelpGraphqlError()
      }

      return response
    } catch (error) {
      console.error(JSON.stringify(error))

      if (error instanceof YelpGraphqlError) throw error

      throw new UnexpectedError()
    }
  }
}
