export function Button({ text, onClick, type = 'button' }) {
  const button = document.createElement('button');

  button.textContent = text;
  button.type = type;
  button.addEventListener('click', onClick);

  return button;
}
