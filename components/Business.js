export function Business(business) {
  this.container = document.createElement('article');
  this.business = business;

  this.createBusinessCard();
}

Business.prototype.createBusinessCard = function () {
  const { image, name, address, phone, reviewsCount } = this.business;
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

  this.container.innerHTML = component;
};
