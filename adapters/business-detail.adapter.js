import { DEFAULT_USER_PROFILE_PIC_URL, IMAGE_NOT_FOUND_PATH } from '../constants.js';

function adaptHour({ day, start, end }) {
  return {
    day,
    start: start ?? 'Start hour not provided',
    end: end ?? 'End hour not provided',
  };
}

function adaptReview({ rating, text, time_created, user }) {
  return {
    rating,
    text: text ?? 'Review text not available',
    timeCreated: time_created,
    user: {
      profileUrl: user.profile_url ?? DEFAULT_USER_PROFILE_PIC_URL,
      name: user.name ?? 'Name not provided',
    },
  };
}

export function businessDetailAdapter(businessDetailResponse) {
  const { id, name, display_phone, review_count, rating, hours, photos, reviews } =
    businessDetailResponse;

  return {
    id,
    name,
    displayPhone: display_phone ?? 'Phone not available',
    reviewCount: review_count ?? 'No reviews were found',
    rating: rating ?? 'Rating not available',
    isOpen: hours[0].is_open_now ?? 'Info not available',
    hours: hours[0].open.map(adaptHour),
    photos: photos.length > 0 ? photos : IMAGE_NOT_FOUND_PATH,
    reviews: reviews.map(adaptReview),
  };
}
