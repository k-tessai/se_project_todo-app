class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    console.log(data);
    console.log(selector);
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      console.log(this._data.completed);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;

    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  //   _dueDate() {
  //     const dueDate = new Date(data.date);
  //     if (!isNaN(dueDate)) {
  //       todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
  //         year: "numeric",
  //         month: "short",
  //         day: "numeric",
  //       })}`;
  //     }
  //   } Tess check where this should go, not working here

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;
    // TO DO implement dates
    // this._dueDate(); ??

    this._generateCheckboxEl();

    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
