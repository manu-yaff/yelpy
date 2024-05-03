export function ErrorComponent() {
  const componentContainer = document.createElement('p');
  componentContainer.textContent = 'An error ocurred!';

  function getContainer(): HTMLElement {
    return componentContainer;
  }

  return {
    getContainer,
  };
}
