export interface Business {
  id: string;
  name: string;
}

export interface Search {
  business: Business[];
}

export interface SearchApiResponse {
  search: Search;
}