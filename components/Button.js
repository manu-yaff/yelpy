import { BaseComponent } from './BaseElement.js';

Object.setPrototypeOf(Button, BaseComponent);

export function Button({ parentNode, text, onClick, type = 'button' }) {
  BaseComponent.apply(this, [parentNode, 'button']);

  this.container.textContent = text;
  this.container.type = type;
  this.container.addEventListener('click', onClick);
}
