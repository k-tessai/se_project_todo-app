import FormValidator from "../components/FormValidator.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos } from "../utils/constants.js";
import { validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import Section from "../components/section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const renderTodo = (item) => {
  const todo = createTodoElement(item);
  section.addItem(todo);
};

function _handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function createTodoElement(todoData) {
  const todo = new Todo(
    todoData,
    "#todo-template",
    _handleCheck,
    (increment, isDelete = false) =>
      todoCounter.updateTotal(increment, isDelete)
  );
  return todo.getView();
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };

    renderTodo(values);

    todoCounter.updateTotal(true);
    //const todoElement = createTodoElement(values);
    //section.addItem(todoElement);

    //addTodoFormValidator.resetValidation();

    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: (todoItem) => {
    renderTodo(todoItem);
    // const todoElement = todo.getView();
    //section.addItem(todoElement);
    //todoCounter.updateTotal(true);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

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
