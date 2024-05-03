import { DEFAULT_USER_PROFILE_PIC_URL } from '../common/constants.js';
import { ReviewEntity } from '../common/entities.js';
import { $ } from '../common/dom.js';

interface ReviewProps extends ReviewEntity {}

export function Review({ user, text, timeCreated, rating }: ReviewProps) {
  const componentContainer = $.createElement('div');
  const markup = `
    <div>
      <div class="user-profile">
        <img
          src="${user?.profileUrl}"
          alt="user profile"
        />
        <p>${user?.name ?? 'Username not available'}</p>
      </div>
      <div>
        <p>${timeCreated ?? 'Time created not available'}</p>
      </div>
      <div>
        ${renderReviewRating()}
      </div>
      <p>${text ?? 'Review not available'}</p>
    </div>`;

  function addEventListeners(): void {
    const profileImg = componentContainer.querySelector('img');

    profileImg?.addEventListener('error', function setDefaultProfileImg() {
      this.src = DEFAULT_USER_PROFILE_PIC_URL;
    });
  }

  function renderReviewRating(): string {
    if (rating == undefined) return '';

    return Array(rating)
      .fill(null)
      .map(() => '<i class="ph-fill ph-star review-icon"></i>')
      .join('');
  }

  function getContainer(): HTMLElement {
    return componentContainer;
  }

  function initComponent(): void {
    componentContainer.insertAdjacentHTML('beforeend', markup);
    addEventListeners();
  }

  initComponent();

  return {
    getContainer,
  };
}
