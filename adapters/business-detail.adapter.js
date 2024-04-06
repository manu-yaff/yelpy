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
    text,
    timeCreated: time_created.slice(0, 10),
    user: {
      profileUrl: user?.profile_url ?? DEFAULT_USER_PROFILE_PIC_URL,
      name: user?.name,
    },
  };
}

/**
 * @param {Object} businessDetail
 * @example
 * businessDetail {
 *  id: 'Y2Iqqe13-n7_60q9ND0vMA'
 *  name: 'Burgers Jonh'
 *  phone: '+524424034677'
 *  photos: ['https://s3-media1.fl.yelpcdn.com/bphoto/EPQjzmlcf6bjSsFo3paTXg/o.jpg']
 *  location: {
 *    'formatted_address': 'Ignacio Allende Sur 13\nCol'
 *  }
 *  reviews: [{
 *    'id': 'pZOg8DPBp2_L28BseHK76Q',
 *    'rating': 5,
 *    'text': 'Wow! If you're in Querétaro this is a must visit place'
 *    'time_created': '2024-02-28 09:22:54',
 *  }]
 * }
 */
export function adaptBusinessDetailObject({
  id,
  name,
  location,
  display_phone,
  review_count,
  rating,
  hours,
  photos,
  reviews,
}) {
  return {
    id,
    name,
    rating,
    address: location?.formatted_address,
    phone: display_phone,
    reviewsCount: review_count,
    isOpen: hours[0]?.is_open_now,
    photos: photos?.length > 0 ? photos : IMAGE_NOT_FOUND_PATH,
    hours: hours[0]?.open.length > 0 ? hours[0].open.map(adaptHour) : [],
    reviews: reviews?.length > 0 ? reviews.map(adaptReview) : [],
  };
}
