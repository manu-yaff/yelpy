export function Error(parentNode) {
  this.parentNode = parentNode;
  this.container = $create('p');
}

Error.prototype.render = function () {
  this.container.textContent = 'Error!';
  this.parentNode.append(this.container);
};

Error.prototype.remove = function () {
  this.container.remove();
};
