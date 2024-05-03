import { $ } from '../common/dom.js';

interface ButtonProps {
  text: string;
  type: string;
  onClick: () => void;
}

export function Button({ text, onClick, type = 'button' }: ButtonProps) {
  const componentContainer = $.createElement('button');

  function initComponent(): void {
    componentContainer.setAttribute('type', type);
    componentContainer.textContent = text;

    addEventListenersToButton();
  }

  function getContainer(): HTMLElement {
    return componentContainer;
  }

  function addEventListenersToButton() {
    componentContainer.addEventListener('click', function callClickHandler() {
      onClick();
    });
  }

  initComponent();

  return {
    getContainer,
  };
}
