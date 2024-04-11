export function NotFoundPage() {
  const componentContainer = document.createElement('div');

  function getContainer() {
    return componentContainer;
  }

  function initComponent() {
    const notFound = document.createElement('p');
    notFound.textContent = '404 Page not found!';

    componentContainer.append(notFound);
  }

  initComponent();

  return {
    getContainer,
  };
}
