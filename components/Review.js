export function Review({ user, text, timeCreated, rating }) {
  const markup = `
    <div>
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
    </p>
  `;

  function renderRating() {
    return Array.from(
      { length: rating },
      () => '<i class="ph-duotone ph-star" data-testid="review-star-icon"></i>'
    ).join('');
  }

  function render(container) {
    container.innerHTML = markup;

    return container;
  }

  return {
    render,
  };
}
