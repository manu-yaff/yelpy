import { DEFAULT_USER_PROFILE_PIC_URL } from '../constants.js';

/**
 *
 * @param {Object} props
 * @example props {
 *  user: {
 *    name: 'Jonh Doe'
 *    profileUrl: 'https://user-profile.png'
 *  }
 *  text: 'This place is amazing'
 *  timeCreated: '2024-01-28'
 *  rating: 4
 * }
 */
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

  function addEventListeners() {
    const profileImg = componentContainer.querySelector('img');

    profileImg.addEventListener('error', function setDefaultProfileImg() {
      profileImg.src = DEFAULT_USER_PROFILE_PIC_URL;
    });
  }

  function renderReviewRating() {
    return Array.from({ length: rating })
      .map(() => '<i class="ph-duotone ph-star"></i>')
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
