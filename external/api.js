import { adaptBusinessDetailObject } from '../adapters/business-detail.adapter.js';
import { adaptBusinessObject } from '../adapters/business.adapter.js';
import { API_HOST } from '../constants.js';
import { BUSINESS_DETAIL_QUERY, SEARCH_BUSINESS_QUERY } from '../graphql/queries.js';

async function getBusinessBySearch(searchTerm, location) {
  try {
    const result = await fetch(API_HOST, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        query: SEARCH_BUSINESS_QUERY,
        variables: {
          searchTerm,
          location,
        },
      }),
    });

    const { data } = await result.json();
    const businessList = data.search.business;

    return businessList.map(adaptBusinessObject);
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

async function getBusinessDetail(businessId) {
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

    const { data } = await result.json();
    const businessDetail = data.business;

    return adaptBusinessDetailObject(businessDetail);
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

export { getBusinessBySearch, getBusinessDetail };
