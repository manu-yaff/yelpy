import { BusinessDetail } from './Buesiness';
// export interface SearchApiResponse {
//   search: {
//     business: Business[]
//   } | null;
// }

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