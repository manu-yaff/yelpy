import { SHARED } from '../../shared/constants';

/**
 * @typedef {Object} Location
 * @property {string} formatted_address - The business formatted address
 */

/**
 * Takes a business response object from the API and adapts it to be used in the app
 * @param {Object} business The business in the API response format
 * @param {string} business.id The business id
 * @param {string} business.name The business name
 * @param {string} business.display_phone The business phone
 * @param {(Array | undefined)} business.photos The business photos
 * @param {Location} business.location{} Object containing the formatted address
 * @param {number} business.review_count The business review count
 * @returns {Business} The business response adapted
 */
export function adaptBusinessObject(business) {
  const { id, name, display_phone, photos, location, review_count } = business;

  return {
    id,
    name: Boolean(name) ? name : null,
    phone: Boolean(display_phone) ? display_phone : null,
    imageUrl: photos?.length > 0 ? photos[0] : SHARED.assets.imageNotFoundPath,
    address: Boolean(location?.formatted_address)
      ? location.formatted_address
      : null,
    reviewsCount: review_count,
  };
}
