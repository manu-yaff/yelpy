import { Location } from './Location';

export interface Business {
  id: string;
  photos: string[];
  name: string;
  location: Location;
  review_count: number;
  display_phone: string;
}

export interface SearchApiResponse {
  search: {
    business: Business[]
  } | null;
}