import { IMAGE_NOT_FOUND_PATH } from '../common/constants.js';
export function businessObjectFromApiResponse(businessResponse) {
    var _a;
    const { id, name, display_phone, photos, location, review_count } = businessResponse;
    return {
        id,
        name,
        phone: display_phone,
        imageUrl: (_a = photos === null || photos === void 0 ? void 0 : photos[0]) !== null && _a !== void 0 ? _a : IMAGE_NOT_FOUND_PATH,
        address: location === null || location === void 0 ? void 0 : location.formatted_address,
        reviewsCount: review_count,
    };
}
