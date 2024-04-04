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
    timeCreated: time_created.slice(0, 10),
    user: {
      profileUrl: user?.profile_url ?? DEFAULT_USER_PROFILE_PIC_URL,
      name: user?.name ?? 'Name not provided',
    },
  };
}

export function businessDetailAdapter(businessDetailResponse) {
  const { id, name, location, display_phone, review_count, rating, hours, photos, reviews } =
    businessDetailResponse;

  // TODO: should I only adapt the information received or also add this empty states values here
  return {
    id,
    name,
    address: location?.formatted_address ?? 'Address not available',
    displayPhone: display_phone ?? 'Phone not available', // TODO: rename according to how components received the props
    reviewCount: review_count ? `${review_count} reviews` : 'No reviews were found',
    rating: rating ?? 'Rating not available',
    isOpen: hours[0]?.is_open_now ?? 'Info not available',
    hours:
      hours[0]?.open.length > 0 ? hours[0].open.map(adaptHour) : 'Business hours not available',
    photos: photos?.length > 0 ? photos : IMAGE_NOT_FOUND_PATH,
    reviews: reviews?.length > 0 ? reviews.map(adaptReview) : [],
  };
}
