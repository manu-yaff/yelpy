import { DEFAULT_USER_PROFILE_PIC_URL } from '../common/constants.js';
import { $ } from '../common/dom.js';
export function Review({ user, text, timeCreated, rating }) {
    var _a;
    const componentContainer = $.createElement('div');
    const markup = `
    <div>
      <div class="user-profile">
        <img
          src="${user === null || user === void 0 ? void 0 : user.profileUrl}"
          alt="user profile"
        />
        <p>${(_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : 'Username not available'}</p>
      </div>
      <div>
        <p>${timeCreated !== null && timeCreated !== void 0 ? timeCreated : 'Time created not available'}</p>
      </div>
      <div>
        ${renderReviewRating()}
      </div>
      <p>${text !== null && text !== void 0 ? text : 'Review not available'}</p>
    </div>`;
    function addEventListeners() {
        const profileImg = componentContainer.querySelector('img');
        profileImg === null || profileImg === void 0 ? void 0 : profileImg.addEventListener('error', function setDefaultProfileImg() {
            this.src = DEFAULT_USER_PROFILE_PIC_URL;
        });
    }
    function renderReviewRating() {
        if (rating == undefined)
            return '';
        return Array(rating)
            .fill(null)
            .map(() => '<i class="ph-fill ph-star review-icon"></i>')
            .join('');
    }
    function getContainer() {
        return componentContainer;
    }
    function initComponent() {
        componentContainer.insertAdjacentHTML('beforeend', markup);
        addEventListeners();
    }
    initComponent();
    return {
        getContainer,
    };
}
