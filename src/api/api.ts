import { businessDetailObjectFromApiResponse } from '../adapters/business-detail.adapter.js';
import { businessObjectFromApiResponse } from '../adapters/business.adapter.js';
import { API_HOST } from '../common/constants.js';
import { BusinessDetailEntity, BusinessEntity } from '../common/entities.js';
import { BUSINESS_DETAIL_QUERY, SEARCH_BUSINESS_QUERY } from './queries.js';
import { BusinessDetailResponse, BusinessSearchResponse } from './response.types.js';

export async function getBusinessBySearch(
  searchTerm: string,
  location: string
): Promise<Array<BusinessEntity>> {
  try {
    const result = await fetch(API_HOST, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        query: SEARCH_BUSINESS_QUERY,
        variables: { searchTerm, location },
      }),
    });

    const { data } = (await result.json()) as BusinessSearchResponse;
    const businessList = data.search.business;

    return businessList.map(businessObjectFromApiResponse);
  } catch (error: unknown) {
    console.error('Error: ', error);

    throw error;
  }
}

export async function getBusinessDetail(
  businessId: string
): Promise<BusinessDetailEntity> {
  try {
    const result = await fetch(API_HOST, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        query: BUSINESS_DETAIL_QUERY,
        variables: {
          id: businessId,
        },
      }),
    });

    const { data } = (await result.json()) as BusinessDetailResponse;
    const businessDetail = data.business;

    return businessDetailObjectFromApiResponse(businessDetail);
  } catch (error: unknown) {
    console.error('Error: ', error);

    throw error;
  }
}
