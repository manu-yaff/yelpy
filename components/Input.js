/**
 * @param {Object} props
 * @example
 * props {
 *  type: 'text'
 *  labelText: 'Location'
 *  placeholder: 'eg San Francisco'
 *  name: 'location-input' - used to retrieve value in FormData
 *  required: true
 * }
 */
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

  function initComponent() {
    componentContainer.insertAdjacentHTML('beforeend', markup);
    const input = componentContainer.querySelector('input');

    input.addEventListener('input', function setInputValue(event) {
      input.value = event.target.value;
    });
  }

  function getContainer() {
    return componentContainer;
  }

  initComponent();

  return {
    getContainer,
  };
}
