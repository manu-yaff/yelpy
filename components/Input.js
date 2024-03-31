// TODO: define where to validate inputs, here or in parent component
export function Input({ type, labelText, placeholder, name }) {
  const markup = `
    <div>
      <label for="${name}">${labelText}</label>
      <input type="${type}" placeholder="${placeholder}" name="${name}" />
    </div>
  `;

  function getMarkup() {
    return markup;
  }

  function render(container) {
    container.insertAdjacentHTML('beforeend', markup);
  }

  return {
    getMarkup,
    render,
  };
}
