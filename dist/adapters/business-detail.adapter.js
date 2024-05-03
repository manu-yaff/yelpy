import { DEFAULT_USER_PROFILE_PIC_URL, IMAGE_NOT_FOUND_PATH, } from '../common/constants.js';
function adaptReview({ rating, text, time_created, user }) {
    var _a;
    return {
        rating,
        text,
        timeCreated: time_created === null || time_created === void 0 ? void 0 : time_created.slice(0, 10),
        user: {
            profileUrl: (_a = user === null || user === void 0 ? void 0 : user.profile_url) !== null && _a !== void 0 ? _a : DEFAULT_USER_PROFILE_PIC_URL,
            name: user === null || user === void 0 ? void 0 : user.name,
        },
    };
}
export function businessDetailObjectFromApiResponse(businessDetailResponse) {
    var _a, _b, _c, _d;
    const { id, name, rating, location, display_phone, review_count, hours, photos, reviews, } = businessDetailResponse;
    return {
        id,
        name,
        rating,
        address: location === null || location === void 0 ? void 0 : location.formatted_address,
        phone: display_phone,
        reviewsCount: review_count,
        imageUrl: (_a = photos === null || photos === void 0 ? void 0 : photos[0]) !== null && _a !== void 0 ? _a : IMAGE_NOT_FOUND_PATH,
        hours: (_c = (_b = hours === null || hours === void 0 ? void 0 : hours[0]) === null || _b === void 0 ? void 0 : _b.open) !== null && _c !== void 0 ? _c : [],
        isOpen: (_d = hours === null || hours === void 0 ? void 0 : hours[0]) === null || _d === void 0 ? void 0 : _d.is_open_now,
        reviews: (reviews === null || reviews === void 0 ? void 0 : reviews.length) ? reviews.map(adaptReview) : [],
    };
}
