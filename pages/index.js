import FormValidator from "../components/FormValidator.js";

import { v4 as uuidv4 } from "https://jspm.dev/uuid";
console.log(uuidv4());

import { initialTodos } from "../utils/constants.js";
import { validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../components/section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const section = new Section({
  items: [], //pass initial todos
  renderer: () => {
    // generate todo item
    //add it to the todo list -- append
    // refer to the forEach loop in this file
  },
  containerSelector: ".todos__list",
});

//call section instance's renderItems method

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
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

  // initialTodos.forEach(item) => {
  // const todo = generateTodo(item);
  // todosList.append(todo);} -- this is what Kevin's initialTodos looks like -- use add item method instead of append
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
