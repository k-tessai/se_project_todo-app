import FormValidator from "../components/FormValidator.js";

import { v4 as uuidv4 } from "https://jspm.dev/uuid";
console.log(uuidv4());

import { initialTodos } from "../utils/constants.js";
import { validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../components/section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };

    const todo = new Todo(values, "#todo-template");
    const todoElement = todo.getView();
    section.addItem(todoElement);

    //addTodoFormValidator.resetValidation();
    const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
    newTodoValidator.enableValidation();

    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos, //pass initial todos
  renderer: (todoItem) => {
    // generate todo item
    const todo = new Todo(todoItem, "#todo-template");
    const todoElement = todo.getView();
    section.addItem(todoElement);
    //add it to the todo list
    // refer to the forEach loop in this file
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

function renderTodo(item) {
  console.log("Data received in renderTodo:", item);
  const todo = generateTodo(item);
  todosList.append(todo);
}

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();

//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();
//   const values = { name, date, id };

//   const todo = new Todo(values, "#todo-template");
//   const todoElement = todo.getView();
//   section.addItem(todoElement);

// addTodoFormValidator.resetValidation();

//   addTodoPopup.close();
// });

// const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
// newTodoValidator.enableValidation();
