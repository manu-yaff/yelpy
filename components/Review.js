export function Review({ user, text, timeCreated, rating }) {
  const markup = `
    <div data-testid="review-item">
      <div>
        <img
          src="${user.profileUrl}"
          alt="${user.name} profile"
          onerror="(() => {
            this.src = '../assets/default-image-not-found.jpeg'
          })()"
        />
        <div>
          <p>${user.name}<p>
          <p>${timeCreated}</p>
        </div>
      <div>
      <div id="">
        ${renderRating()}
      <div>
      <p>${text}<p>
    </div>`;

  function renderRating() {
    return new Array(rating)
      .map(() => '<i class="ph-duotone ph-star" data-testid="review-star-icon"></i>')
      .join('');
  }

  function render(container) {
    container.innerHTML = markup;

    return container;
  }

  function getMarkup() {
    return markup;
  }

  return {
    render: render,
    getMarkup: getMarkup,
  };
}
