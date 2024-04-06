/**
 *
 * @param {Object} props
 * @example
 * props {
 *  text: 'Search'
 *  type: 'submit'
 *  onClick: () => { console.log('onclick function')}
 * }
 */
export function Button({ text, onClick, type = 'button' }) {
  const componentContainer = document.createElement('button');

  function initComponent() {
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

  initComponent();

  return {
    getContainer,
  };
}
