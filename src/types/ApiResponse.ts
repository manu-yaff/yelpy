import { BusinessDetail, Business } from './Business';

export interface SearchApiResponse {
  errors: [
    {
      message: string
    }
  ],
  data: {
    search: {
      business: Business[] | null;
    }
  }
}

export interface GetBusinessDetailResponse {
  errors: [
    {
      message: string
    }
  ],
  data: {
    business: BusinessDetail | null;
  }
}