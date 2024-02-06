import { getBusinessBySearch } from '../external/api.js';
import { Business } from './Business.js';

export function BusinessList(list) {
  const container = document.createElement('section');
  const businessComponents = list.map(Business);

  businessComponents.forEach(function appendBusiness(business) {
    container.append(business);
  });

  return container;
}
