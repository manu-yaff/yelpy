import { $ } from '../common/dom.js';

interface InputProps {
  type: string;
  labelText: string;
  placeholder: string;
  name: string;
  required: boolean;
  value: string;
}

export function Input(props: InputProps) {
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

  function getContainer(): HTMLElement {
    return componentContainer;
  }

  function initComponent(): void {
    componentContainer.insertAdjacentHTML('beforeend', markup);
    const input = componentContainer.querySelector('input');

    input?.addEventListener('input', function setInputValue(event: Event) {
      this.value = (event.target as HTMLInputElement).value;
    });
  }

  initComponent();

  return {
    getContainer,
  };
}
