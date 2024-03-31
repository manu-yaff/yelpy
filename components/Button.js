export function Button({ text, onClick, type = 'button' }) {
  const buttonId = `${text}-button`;

  const markup = `
    <button id="${buttonId}" type="${type}">${text}</button>
  `;

  function getMarkup() {
    return markup;
  }

  function addEventListenersToButton() {
    const btn = document.getElementById(buttonId);
    btn.addEventListener('click', function setOnClickHandler() {
      onClick();
    });
  }

  function render(container) {
    container.insertAdjacentHTML('beforeend', markup);
    addEventListenersToButton();
  }

  return {
    getMarkup,
    render,
  };
}
