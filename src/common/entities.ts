export interface BusinessEntity {
  id?: string;
  name?: string;
  phone?: string;
  address?: string;
  reviewsCount?: number;
  imageUrl: string; // default is provided when it's not present
}

export interface User {
  name?: string;
  profileUrl: string; // default is provided when it's not present
}

export interface ReviewEntity {
  rating?: number;
  text?: string;
  timeCreated?: string;
  user?: User;
}

export interface HourEntity {
  start?: string;
  end?: string;
  day?: number;
}

export interface BusinessDetailEntity extends BusinessEntity {
  isOpen?: boolean;
  rating?: number;
  hours?: Array<HourEntity>;
  reviews?: Array<ReviewEntity>;
}
