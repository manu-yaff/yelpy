export function BusinessCard(props) {
  const { imageUrl, name, address, phone, reviews } = props;

  const markup = `
    <div>
      <img src="${imageUrl}" alt="${name} business image" />
      <p>${name}</p>
      <div>
        <p>${address}</p>
        <div>
          <p>${reviews} reviews</p>
          <p>${phone}</p>
        </div>
      </div>
    </div>
  `;

  function getMarkup() {
    return markup;
  }

  return { getMarkup };
}
