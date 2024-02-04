import { getBusinessBySearch } from '../external/api.js';
import { Business } from './Business.js';

export async function BusinessList() {
  const businessList = document.createElement('section');
  const sample = document.createElement('h2');
  sample.innerHTML = 'here goes the list of the results';

  businessList.append(sample, '<h3>another child</h3>');
  // const businessList = await getBusinessBySearch('Tacos', 'Queretaro');
  // const businessListContainer = document.createElement('section');
  // businessListContainer.classList.add('business-list');
  // const businessComponents = businessList.map(Business);
  // businessComponents.forEach(function appendBusiness(business) {
  //   businessListContainer.appendChild(business);
  // });
  // const body = document.querySelector('body');
  // body.appendChild(businessListContainer);

  return businessList;
}
