export function Loader() {
  const componentContainer = document.createElement('p');

  function initComponent() {
    componentContainer.textContent = 'Loading...';
    componentContainer.setAttribute('aria-busy', true);
  }

  function getContainer() {
    return componentContainer;
  }

  initComponent();

  return {
    getContainer,
  };
}
