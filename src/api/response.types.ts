export interface BusinessSearchResponse {
  data: {
    search: {
      total: number;
      business: BusinessFromApi[];
    };
  };
}

export interface BusinessDetailResponse {
  data: {
    business: BusinessDetailFromApi;
  };
}

export interface BusinessFromApi {
  id?: string;
  name?: string;
  display_phone?: string;
  photos?: Array<string>;
  location?: {
    formatted_address?: string;
  };
  review_count?: number;
}

export interface BusinessDetailFromApi extends BusinessFromApi {
  rating?: number;
  reviews?: Array<ReviewFromApi>;
  hours?: Array<HourFromApi>;
}

export interface UserFromApi {
  profile_url?: string;
  name?: string;
}

export interface ReviewFromApi {
  id: string;
  rating?: number;
  text?: string;
  time_created?: string;
  user?: UserFromApi;
}

export interface HourFromApi {
  is_open_now?: boolean;
  open?: Array<{
    end: string;
    start: string;
    day: number;
  }>;
}
