import { API_HOST } from '../constants.js';
import { SEARCH_BUSINESS_QUERY } from '../graphql/queries.js';
import { adaptBusinessResponse } from '../adapters/business.adapter.js';

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

    return businessList.map(adaptBusinessResponse);
  } catch (error) {
    throw error;
  }
}

export { getBusinessBySearch };
