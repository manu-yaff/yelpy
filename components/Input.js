export function Input({ type, labelText, placeholder, name }) {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');

  label.textContent = labelText;
  input.type = type;
  input.placeholder = placeholder;
  input.name = name;

  // TODO: add for to inputs

  div.append(label, input);

  return div;
}
