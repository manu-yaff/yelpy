export function Input({ type, labelText, placeholder, name, validator }) {
  this.type = type;
  this.labelText = labelText;
  this.placeholder = placeholder;
  this.name = name;
  this.value = undefined;
  this.validator = validator;

  this.label = document.createElement('label');
  this.input = document.createElement('input');
  this.container = document.createElement('div');
  this.validationErrorContainer = document.createElement('div');

  this.render();
}

Input.prototype.render = function () {
  this.label.textContent = this.labelText;
  this.input.type = this.type;
  this.input.name = this.name;

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
