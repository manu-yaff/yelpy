export const $ = {
  body: document.querySelector('body'),

  createElement: function (elementType) {
    return document.createElement(elementType);
  },

  render: function (htmlContent, targetElement = $.body) {
    targetElement.innerHTML = htmlContent;
  },
};
