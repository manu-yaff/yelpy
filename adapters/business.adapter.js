import { IMAGE_NOT_FOUND_PATH } from '../constants.js';

function adaptBusinessResponse(businessResponse) {
  const { id, photos, name, location, phone, review_count } = businessResponse;

  return {
    id,
    imageUrl: photos?.length > 0 ? photos[0] : IMAGE_NOT_FOUND_PATH,
    name: name ?? 'Name not available',
    address: location?.formatted_address ?? 'Address not available',
    phone: phone ?? 'Phone not available',
    reviews: review_count ? `${review_count} reviews` : 'Review count not available',
  };
}

export { adaptBusinessResponse };
