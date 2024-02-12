export function BaseComponent(parentNode = null, containerType) {
  this.parentNode = parentNode;
  this.container = document.createElement(containerType);
}

BaseComponent.prototype.create = function (element) {
  return document.createElement(element);
};
