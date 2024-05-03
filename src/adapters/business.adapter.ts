import { BusinessFromApi } from '../api/response.types.js';
import { IMAGE_NOT_FOUND_PATH } from '../common/constants.js';
import { BusinessEntity } from '../common/entities.js';

export function businessObjectFromApiResponse(
  businessResponse: BusinessFromApi
): BusinessEntity {
  const { id, name, display_phone, photos, location, review_count } = businessResponse;

  return {
    id,
    name,
    phone: display_phone,
    imageUrl: photos?.[0] ?? IMAGE_NOT_FOUND_PATH,
    address: location?.formatted_address,
    reviewsCount: review_count,
  };
}
