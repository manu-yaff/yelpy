export const $ = {
  MAIN: 'main' as const,

  createElement: function (type: string): HTMLElement {
    return document.createElement(type);
  },

  getById: function (id: string): HTMLElement {
    const element = document.getElementById(id);
    if (element == null) throw Error('Element not found in DOM');

    return element;
  },

  querySelector: function (target: string): Element {
    const element = document.querySelector(target);
    if (element == null) throw Error('Element not found in DOM');

    return element;
  },
};
