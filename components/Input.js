export function Input({ type, labelText, placeholder, name, validator }) {
  this.type = type;
  this.labelText = labelText;
  this.placeholder = placeholder;
  this.name = name;
  this.value = undefined;
  this.validator = validator;

  this.container = document.createElement('div');
  this.validationErrorContainer = document.createElement('div');

  this.render();
}

Input.prototype.render = function () {
  const label = document.createElement('label');
  const input = document.createElement('input');

  label.textContent = this.labelText;
  input.type = this.type;
  input.name = this.name;

  input.addEventListener(
    'input',
    function setValue(event) {
      this.value = event.target.value;
      this.validate(this.value);
    }.bind(this)
  );

  this.container.append(label, input, this.validationErrorContainer);
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
