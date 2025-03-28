class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
    //call the renderer, and pass the item as an argument
  }

  addItem(element) {
    this._container.append(element);
  }
}

export default Section;
