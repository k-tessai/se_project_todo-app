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

  _generateDueDate() {
    console.log("dueDate");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    const date = new Date(this._data.date);
    if (!isNaN(date)) {
      this._todoDate.textContent = `Due: ${date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._generateDueDate(this._data.date);

    this._generateCheckboxEl();

    this._setEventListeners();

    console.log("I was created", this._todoElement);

    return this._todoElement;
  }
}

export default Todo;
