export function Loader(parentNode) {
  this.parentNode = parentNode;
  this.container = $create('p');
}

Loader.prototype.render = function () {
  this.container.textContent = 'Loading...';
  this.container.setAttribute('aria-busy', true);
  this.parentNode.append(this.container);
};

Loader.prototype.remove = function () {
  this.container.remove();
};
