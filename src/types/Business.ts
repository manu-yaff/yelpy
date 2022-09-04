import { Hour } from './Time';
import { Location } from './Location';
import { Review } from './Review';

export interface Business {
  id: string;
  photos: string[];
  name: string;
  location: Location;
  review_count: number;
  display_phone: string;
}

export interface BusinessDetail extends Business {
  is_close: boolean;
  hours: Hour[];
  reviews: Review[];
}
