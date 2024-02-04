import { BusinessList } from '../components/BusinessList.js';
import { SearchForm } from '../components/SearchForm.js';

export async function BusinessSearchPage() {
  const businessSearchPage = document.createElement('section');
  const searchForm = SearchForm();
  const businessList = await BusinessList();

  businessSearchPage.appendChild(searchForm);
  businessSearchPage.appendChild(businessList);

  document.querySelector('body').appendChild(businessSearchPage);
}
