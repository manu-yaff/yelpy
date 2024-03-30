export function DOM() {
  function render(container, html) {
    container.insertAdjacentHTML('beforeend', html);
  }

  function renderList(list, component) {
    return list.map((listItem) => component().getMarkup()).join('');
  }

  return { render };
}
