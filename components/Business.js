function Business(business) {
  const businessContainer = document.createElement('article');
  businessContainer.classList.add('business-card');
  const { image, name, address, phone, reviewsCount } = business;

  const component = `
    <img
      src="${image}"
      alt="${name} business"
    />
    <hgroup>
      <h2>${name}</h2>
      <div class="space-between">
        <p>${address}</p>
      </div>
    </hgroup>
    <div class="space-between">
      <p>${phone}</p>
      <p>${reviewsCount} reviews</p>
    </div>
  `;

  businessContainer.innerHTML = component;

  return businessContainer;
}

export { Business };
