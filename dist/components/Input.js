import { $ } from '../common/dom.js';
export function Input(props) {
    const { type, labelText, placeholder, name, required, value } = props;
    const componentContainer = $.createElement('div');
    const markup = `
    <label for="${name}">${labelText}</label>
    <input
      type="${type}"
      placeholder="${placeholder}"
      name="${name}"
      ${required ? 'required' : ''}
      ${value ? `value="${value}"` : ''}
    />
  `;
    function getContainer() {
        return componentContainer;
    }
    function initComponent() {
        componentContainer.insertAdjacentHTML('beforeend', markup);
        const input = componentContainer.querySelector('input');
        input === null || input === void 0 ? void 0 : input.addEventListener('input', function setInputValue(event) {
            this.value = event.target.value;
        });
    }
    initComponent();
    return {
        getContainer,
    };
}
