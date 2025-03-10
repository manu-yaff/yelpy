import { Business } from '../../domain/entities/Business'
import { BusinessDetailEntity } from '../../domain/entities/BusinessDetail'
import { BusinessRepository } from '../../domain/repositories/business-repository'
import { businessDetailFromApiToBusinessDetailEntity } from '../adapters/business-detail-from-yelp-to-entity'
import { businessFromApiToBusinessEntity } from '../adapters/business-from-yelp-to-entity'
import { businessDetailQuery } from './graphql-queries/business-detail-query'
import { searchBusinessQuery } from './graphql-queries/search-business-query'
import {
  YelpBusinessDetailResponse,
  YelpSearchBusinessResponse,
} from './yelp-business-repository.types'

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

  private async sendGraphqlRequest(variables: Record<string, unknown>): Promise<Response> {
    try {
      const response = await this.fetchFn(this.apiConfig.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchBusinessQuery, variables }),
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

  async searchByTermAndLocation(searchTerm: string, location: string): Promise<Array<Business>> {
    const response = await this.sendGraphqlRequest({ searchTerm, location })

    const { data } = (await response.json()) as YelpSearchBusinessResponse

    return data.search.business.map(businessFromApiToBusinessEntity)
  }

  async getBusinessDetail(id: string): Promise<BusinessDetailEntity> {
    const response = await this.fetchFn(apiHost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: businessDetailQuery,
        variables: {
          id,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(GraphqlError)
    }

    const { data } = (await response.json()) as YelpBusinessDetailResponse

    return businessDetailFromApiToBusinessDetailEntity(data.business)
  }
}
