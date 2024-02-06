export function Button({ text, onClick, type = 'button' }) {
  this.container = document.createElement('button');
  this.container.textContent = text;

  this.container.type = type;
  this.container.addEventListener('click', onClick);
}
