import { DEFAULT_USER_PROFILE_PIC_URL } from '../constants.js';

export function Review({ user, text, timeCreated, rating }) {
  const componentContainer = document.createElement('div');
  const markup = `
    <div>
      <div>
        <img
          src="${user.profileUrl}"
          alt="user profile"
        />
        <div>
          <p>${user.name}</p>
          <p>${timeCreated}</p>
        </div>
      <div>
      <div> 
        ${renderReviewRating()}
      </div> 
      <p>${text}</p>
    </div>`;

  initComponent();

  function addEventListeners() {
    const profileImg = componentContainer.querySelector('img');

    profileImg.addEventListener('error', function setDefaultProfileImg() {
      profileImg.src = DEFAULT_USER_PROFILE_PIC_URL;
    });
  }

  function initComponent() {
    componentContainer.insertAdjacentHTML('beforeend', markup);
    addEventListeners();
  }

  function renderReviewRating() {
    return Array.from({ length: rating })
      .map(() => '<i class="ph-duotone ph-star" data-testid="review-star-icon"></i>')
      .join('');
  }

  function getContainer() {
    return componentContainer;
  }

  return {
    getContainer,
  };
}
