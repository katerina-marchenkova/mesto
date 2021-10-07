export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items || [];
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(items) {
    this.clear();
    this._items = items || this._items;

    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
}
