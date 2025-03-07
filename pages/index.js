import FormValidator from "../components/FormValidator.js";

import { v4 as uuidv4 } from "https://jspm.dev/uuid";
console.log(uuidv4());

import { initialTodos } from "../utils/constants.js";
import { validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;

  // to be removed
  // const todoElement = todoTemplate.content
  //   .querySelector(".todo")
  //   .cloneNode(true);
  // const todoNameEl = todoElement.querySelector(".todo__name");
  // const todoCheckboxEl = todoElement.querySelector(".todo__completed");
  // const todoLabel = todoElement.querySelector(".todo__label");
  // const todoDate = todoElement.querySelector(".todo__date");
  // const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

  // todoNameEl.textContent = data.name;
  // todoCheckboxEl.checked = data.completed;

  // // Apply id and for attributes.
  // // The id will initially be undefined for new todos.
  // todoCheckboxEl.id = `todo-${data.id}`;
  // todoLabel.setAttribute("for", `todo-${data.id}`);

  // Tess -- to do -- date
  // // If a due date has been set, parsing this it with `new Date` will return a
  // // number. If so, we display a string version of the due date in the todo.
  //
  // }

  // todoDeleteBtn.addEventListener("click", () => {
  //   todoElement.remove();
  // });

  //return todoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

function renderTodo(item) {
  const todo = generateTodo(item);
  todosList.append(todo);
}

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  const todoData = { name: name, date: dateInput };

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };

  // const renderTodo = (item) => {
  //   const todo = generateTodo(item);
  //   todosList.append(todo);
  // };

  renderTodo(values);

  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  renderTodo(item);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
