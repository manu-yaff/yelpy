// TODO: define where to validate inputs, here or in parent component
export function Input({ type, labelText, placeholder, name, required }) {
  const componentContainer = document.createElement('div');
  const markup = `
    <label for="${name}">${labelText}</label>
    <input
      type="${type}"
      placeholder="${placeholder}"
      name="${name}"
      ${required ? 'required' : ''}/>
  `;

  initComponent();

  function initComponent() {
    componentContainer.insertAdjacentHTML('beforeend', markup);
    const input = componentContainer.querySelector('input');

    input.addEventListener('input', function setInputValue(event) {
      input.value = event.target.value;
    });
  }

  function getMarkup() {
    return markup;
  }

  function getContainer() {
    return componentContainer;
  }

  return {
    getMarkup,
    getContainer,
  };
}
