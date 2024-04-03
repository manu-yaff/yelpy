export function Button({ text, onClick, type = 'button' }) {
  const componentContainer = document.createElement('button');
  const buttonId = `${text}-button`;

  initComponent();

  function initComponent() {
    componentContainer.setAttribute('id', buttonId);
    componentContainer.setAttribute('type', type);
    componentContainer.textContent = text;

    addEventListenersToButton();
  }

  function getContainer() {
    return componentContainer;
  }

  function addEventListenersToButton() {
    componentContainer.addEventListener('click', function setOnClickHandler() {
      onClick();
    });
  }

  return {
    getContainer,
  };
}
