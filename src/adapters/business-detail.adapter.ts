import { BusinessDetailFromApi, ReviewFromApi } from '../api/response.types.js';
import {
  DEFAULT_USER_PROFILE_PIC_URL,
  IMAGE_NOT_FOUND_PATH,
} from '../common/constants.js';
import { BusinessDetailEntity, ReviewEntity } from '../common/entities.js';

function adaptReview({ rating, text, time_created, user }: ReviewFromApi): ReviewEntity {
  return {
    rating,
    text,
    timeCreated: time_created?.slice(0, 10),
    user: {
      profileUrl: user?.profile_url ?? DEFAULT_USER_PROFILE_PIC_URL,
      name: user?.name,
    },
  };
}

export function businessDetailObjectFromApiResponse(
  businessDetailResponse: BusinessDetailFromApi
): BusinessDetailEntity {
  const {
    id,
    name,
    rating,
    location,
    display_phone,
    review_count,
    hours,
    photos,
    reviews,
  } = businessDetailResponse;

  return {
    id,
    name,
    rating,
    address: location?.formatted_address,
    phone: display_phone,
    reviewsCount: review_count,
    imageUrl: photos?.[0] ?? IMAGE_NOT_FOUND_PATH,
    hours: hours?.[0]?.open ?? [],
    isOpen: hours?.[0]?.is_open_now,
    reviews: reviews?.length ? reviews.map(adaptReview) : [],
  };
}
