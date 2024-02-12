import { BaseComponent } from './BaseElement.js';

Object.setPrototypeOf(Input, BaseComponent);

export function Input({ parentNode, type, labelText, placeholder, name, validator }) {
  this.type = type;
  this.labelText = labelText;
  this.placeholder = placeholder;
  this.name = name;
  this.value = undefined;
  this.validator = validator;

  BaseComponent.apply(this, [parentNode, 'div']);

  this.label = BaseComponent.prototype.create('label');
  this.input = BaseComponent.prototype.create('input');
  this.validationErrorContainer = BaseComponent.prototype.create('div');

  this.render();
}

Input.prototype.render = function () {
  this.label.textContent = this.labelText;
  this.input.type = this.type;
  this.input.name = this.name;
  this.input.placeholder = this.placeholder;

  this.input.addEventListener(
    'input',
    function setValue(event) {
      this.value = event.target.value;
      this.validate(this.value);
    }.bind(this)
  );

  this.container.append(this.label, this.input, this.validationErrorContainer);
};

Input.prototype.validate = function () {
  const isValid = this.validator(this.value);

  if (!isValid) {
    this.validationErrorContainer.textContent = 'Input is required!';
    this.validationErrorContainer.style.color = 'red';
    return false;
  } else {
    this.validationErrorContainer.textContent = '';
    return true;
  }
};
