import { IMAGE_NOT_FOUND_PATH } from '../constants.js';

/**
 * @param {Object} business
 * @example
 * business {
 *  id: 'Y2Iqqe13-n7_60q9ND0vMA'
 *  name: 'Burgers Jonh'
 *  display_phone: '+524424034677'
 *  photos: ['https://s3-media1.fl.yelpcdn.com/bphoto/EPQjzmlcf6bjSsFo3paTXg/o.jpg']
 *  location: {
 *    'formatted_address': 'Ignacio Allende Sur 13\nCol'
 *  }
 *  reviewCount: 87
 * }
 */
export function adaptBusinessObject({ id, name, display_phone, photos, location, review_count }) {
  return {
    id,
    name,
    phone: display_phone,
    imageUrl: photos?.length > 0 ? photos[0] : IMAGE_NOT_FOUND_PATH,
    address: location?.formatted_address,
    reviewsCount: review_count,
  };
}
